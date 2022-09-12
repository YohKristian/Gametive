const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

//TEST WILL HAVE
//CREATE 3 USERS -> LOGIN 1 OF THEM -> FIND THEM ALL USING LOGIN TOKEN -> FIND ONE OF THEM -> TEST FAILED CONDITION

beforeAll(() => {
	return queryInterface.bulkInsert("Users", [
		{
			username: "customer01",
			email: "customer01@gmail.com",
			password: hashPassword("password"),
			role: "Customer",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			username: "administrator",
			email: "administrator@gmail.com",
			password: hashPassword("password"),
			role: "Admin",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]);
});

afterAll(() => {
	return queryInterface.bulkDelete("Users", null, {
		truncate: true,
		cascade: true,
		restartIdentity: true,
	});
});

describe("POST Account Register", () => {
	describe("Success Register Account", () => {
		it("should return boolean true", async () => {
			const body = { username: "customer02", email: "customer02@gmail.com", password: "password" };

			const response = await request(app).post("/users/register").send(body);

			expect(response.status).toBe(201);
			expect(response.body).toBe(true);
		});
	});
	describe("Failed Register Account - incomplete / invalid form", () => {
		it("should return object with code and message", async () => {
			const body = { username: "", email: "customer02@gmail.com", password: "password" };

			const response = await request(app).post("/users/register").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 1);
			expect(response.body).toHaveProperty("message", "invalid form data, please check your input");
		});
	});

	describe("Failed Register Account - username/email is not available", () => {
		it("should return object with code and message", async () => {
			const body = { username: "customer02", email: "customer02@gmail.com", password: "password" };

			const response = await request(app).post("/users/register").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 2);
			expect(response.body).toHaveProperty("message", "username / email is not available");
		});
	});

	describe("Failed Register Account - password is less than 5 characters", () => {
		it("should return object of message with array of errors", async () => {
			const body = { username: "customer03", email: "customer03@gmail.com", password: "pass" };

			const response = await request(app).post("/users/register").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", ["Password cannot be less than 5 characters"]);
		});
	});

	describe("Failed Register Account - email and password must be unique", () => {
		it("should return object of message with array of errors", async () => {
			//EMAIL UNIQUE CHECK
			const bodyEmail = { username: "customer03", email: "customer02@gmail.com", password: "password" };

			const responseEmail = await request(app).post("/users/register").send(bodyEmail);

			expect(responseEmail.status).toBe(400);
			expect(responseEmail.body).toBeInstanceOf(Object);
			expect(responseEmail.body).toHaveProperty("message", ["email must be unique"]);

			//USERNAME UNIQUE CHECK
			const bodyUsername = { username: "customer02", email: "customer03@gmail.com", password: "password" };

			const responseUsername = await request(app).post("/users/register").send(bodyUsername);

			expect(responseUsername.status).toBe(400);
			expect(responseUsername.body).toBeInstanceOf(Object);
			expect(responseUsername.body).toHaveProperty("message", ["username must be unique"]);
		});
	});
});

describe("POST Account Login", () => {
	describe("Success Login Account", () => {
		it("should return object with login and access_token", async () => {
			const body = { username: "customer01", password: "password" };

			const response = await request(app).post("/users/login").send(body);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("login", true);
			expect(response.body).toHaveProperty("access_token", expect.any(String));
		});
	});

	describe("Failed Login Account - username / email / password invalid", () => {
		//! they are gave the same error message for security reasons
		it("should return object with code and message", async () => {
			const body = { username: "customer01", password: "password1" };

			const response = await request(app).post("/users/login").send(body);

			expect(response.status).toBe(401);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 4);
			expect(response.body).toHaveProperty("message", "username / password invalid");
		});
	});

	describe("Failed Login Account - username / email empty", () => {
		it("should return object with code and message", async () => {
			const body = { username: "", password: "password" };

			const response = await request(app).post("/users/login").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 3);
			expect(response.body).toHaveProperty("message", "username / password cannot be empty");
		});
	});
});

describe("GET All users account - FOR ADMIN ACCOUNT", () => {
	let access_token = null;
	describe("Success fetch all account", () => {
		it("should return array of object for every accounts", async () => {
			const body = { username: "administrator", password: "password" };
			let response = await request(app).post("/users/login").send(body);
			access_token = response.body.access_token;

			response = await request(app).get("/users?page=1&size=10&search=").set("access_token", access_token);

			expect(response.status).toBe(200);
			//ASSUME THERE IS ALWAYS AT LEAST ONE ACCOUNT
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body.items[0]).toHaveProperty("id", expect.any(Number));
			expect(response.body.items[0]).toHaveProperty("username", expect.any(String));
			expect(response.body.items[0]).toHaveProperty("email", expect.any(String));
			expect(response.body.items[0]).toHaveProperty("role", expect.any(String));
			expect(response.body.items[0]).toHaveProperty("createdAt", expect.any(String));
			expect(response.body.items[0]).toHaveProperty("updatedAt", expect.any(String));
		});
	});

	describe("Failed fetch all account - not an admin", () => {
		it("should return boolean true", async () => {
			const body = { username: "customer01", password: "password" };
			let response = await request(app).post("/users/login").send(body);
			access_token = response.body.access_token;

			response = await request(app).get("/users/").set("access_token", access_token);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 5);
			expect(response.body).toHaveProperty("message", "invalid authorization");
		});
	});
});

describe("GET Account Details", () => {
	describe("Success fetch account details", () => {
		it("should return object of that account detail", async () => {
			let response = await request(app).get("/users/administrator");

			expect(response.status).toBe(200);
			//ASSUME THERE IS ALWAYS AT LEAST ONE ACCOUNT
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("username", expect.any(String));
			expect(response.body).toHaveProperty("email", expect.any(String));
			expect(response.body).toHaveProperty("role", expect.any(String));
			expect(response.body).toHaveProperty("createdAt", expect.any(String));
			expect(response.body).toHaveProperty("updatedAt", expect.any(String));
		});
	});

	describe("Failed fetch account details - customer0999 not found", () => {
		it("should return object with code and message", async () => {
			let response = await request(app).get("/users/customer0999");

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 404);
			expect(response.body).toHaveProperty("message", "data not found");
		});
	});
});

describe("PUT Account Password", () => {
	let access_token = null;
	describe("Success change account password", () => {
		it("should return object with username and message", async () => {
			const body = { username: "customer01", password: "password" };
			let response = await request(app).post("/users/login").send(body);
			access_token = response.body.access_token;
			//
			let passwordChange = { newPassword: "passwordNew", oldPassword: "password" };
			let passwordResponse = await request(app).put("/users/customer1").send(passwordChange).set("access_token", access_token);

			expect(passwordResponse.status).toBe(200);
			expect(passwordResponse.body).toBeInstanceOf(Object);
			expect(passwordResponse.body).toHaveProperty("username", expect.any(String));
			expect(passwordResponse.body).toHaveProperty("message", "password has been changed");
		});
	});

	describe("Failed change account password - invalid form", () => {
		it("should return object with code and message", async () => {
			const body = { username: "customer01", password: "passwordNew" };
			let response = await request(app).post("/users/login").send(body);
			access_token = response.body.access_token;
			//
			let passwordChange = { newPassword: "password", oldPassword: "" };
			let passwordResponse = await request(app).put("/users/customer1").send(passwordChange).set("access_token", access_token);

			expect(passwordResponse.status).toBe(400);
			expect(passwordResponse.body).toBeInstanceOf(Object);
			expect(passwordResponse.body).toHaveProperty("code", 1);
			expect(passwordResponse.body).toHaveProperty("message", "invalid form data, please check your input");
		});
	});
	describe("Failed change account password - bad oldpassword", () => {
		it("should return object with code and message", async () => {
			const body = { username: "customer01", password: "passwordNew" };
			let response = await request(app).post("/users/login").send(body);
			access_token = response.body.access_token;
			//
			let passwordChange = { newPassword: "password", oldPassword: "password" };
			let passwordResponse = await request(app).put("/users/customer1").send(passwordChange).set("access_token", access_token);

			expect(passwordResponse.status).toBe(400);
			expect(passwordResponse.body).toBeInstanceOf(Object);
			expect(passwordResponse.body).toHaveProperty("code", 8);
			expect(passwordResponse.body).toHaveProperty("message", "failed to change password");
		});
	});
});

describe("PUT Admin Change Password User", () => {
	let access_token = null;
	describe("Success change account password from Admin", () => {
		it("should return object with username and message", async () => {
			const body = { username: "administrator", password: "password" };
			let response = await request(app).post("/users/login").send(body);
			access_token = response.body.access_token;
			//
			let passwordChange = { newPassword: "passwordNew" };
			let passwordResponse = await request(app).put("/users/admin/1").send(passwordChange).set("access_token", access_token);

			expect(passwordResponse.status).toBe(200);
			expect(passwordResponse.body).toBeInstanceOf(Object);
			expect(passwordResponse.body).toHaveProperty("username", expect.any(String));
			expect(passwordResponse.body).toHaveProperty("message", "password has been changed");
		});
	});

	describe("Failed change account password from Admin", () => {
		it("should return object with code and message", async () => {
			const body = { username: "administrator", password: "password" };
			let response = await request(app).post("/users/login").send(body);
			access_token = response.body.access_token;
			//
			let passwordChange = { newPassword: "" };
			let passwordResponse = await request(app).put("/users/admin/1").send(passwordChange).set("access_token", access_token);

			expect(passwordResponse.status).toBe(400);
			expect(passwordResponse.body).toBeInstanceOf(Object);
			expect(passwordResponse.body).toHaveProperty("code", 1);
			expect(passwordResponse.body).toHaveProperty("message", "invalid form data, please check your input");
		});
	});
});

describe("POST Create admin account", () => {
	describe("Success create admin account", () => {
		it("Should return true", async () => {
			let admin_login = await request(app).post("/users/login").send({ username: "administrator", password: "password" });
			let access_token = admin_login.body.access_token;

			let credentials = { username: "administrator1", password: hashPassword("password"), email: "administrator1@email.com" };

			let response = await request(app).post("/users/registerAdmin").send(credentials).set("access_token", access_token);

			expect(response.status).toBe(201);
			expect(response.body).toBe(true);
		});
	});

	describe("Failed create admin account - invalid form input", () => {
		it("Should return object with code and message", async () => {
			let admin_login = await request(app).post("/users/login").send({ username: "administrator", password: "password" });
			let access_token = admin_login.body.access_token;

			let credentials = { username: "", password: hashPassword("password"), email: "administrator1@email.com" };

			let response = await request(app).post("/users/registerAdmin").send(credentials).set("access_token", access_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 1);
			expect(response.body).toHaveProperty("message", "invalid form data, please check your input");
		});
	});

	describe("Failed create admin account - username/email is not available", () => {
		it("Should return object with code and message", async () => {
			let admin_login = await request(app).post("/users/login").send({ username: "administrator", password: "password" });
			let access_token = admin_login.body.access_token;

			let credentials = { username: "administrator", password: hashPassword("password"), email: "administrator@gmail.com" };

			let response = await request(app).post("/users/registerAdmin").send(credentials).set("access_token", access_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 2);
			expect(response.body).toHaveProperty("message", "username / email is not available");
		});
	});
});

/**
 * ! NEED TO ADD SAMPLE DATA FIRST
 * ! TODO FOR AFTERNOON
 */

// describe("GET All User history", () => {
// 	let access_token;
// 	describe("Success fetch all user history", () => {
// 		it("Should return object with data history", async () => {
// 			let admin_login = await request(app).post("/users/login").send({ username: "customer01", password: "password" });
// 			access_token = admin_login.body.access_token;

// 			let response = await request;
// 		});
// 	});
// });

describe("DESTROY Account - FOR ADMIN ONLY", () => {
	let access_token = null;
	describe("Success delete user", () => {
		it("should return object with username and message", async () => {
			const body = { username: "administrator", password: "password" };
			let response = await request(app).post("/users/login").send(body);
			access_token = response.body.access_token;
			//
			response = await request(app).delete("/users/1").set("access_token", access_token);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("message", "user has been deleted");
		});
	});
	describe("Failed delete user - user id not found", () => {
		it("should return object with code and message", async () => {
			const body = { username: "administrator", password: "password" };
			let response = await request(app).post("/users/login").send(body);
			access_token = response.body.access_token;
			//
			response = await request(app).delete("/users/1000").set("access_token", access_token);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 9);
			expect(response.body).toHaveProperty("message", "fail to delete, this user is not found");
		});
	});
});
