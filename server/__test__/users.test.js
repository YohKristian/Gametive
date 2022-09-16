const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

//TEST WILL HAVE
//CREATE 3 USERS -> LOGIN 1 OF THEM -> FIND THEM ALL USING LOGIN TOKEN -> FIND ONE OF THEM -> TEST FAILED CONDITION

beforeAll(async () => {
	await queryInterface.bulkInsert("Users", [
		{
			username: "customer01",
			email: "customer01@gmail.com",
			password: hashPassword("password"),
			role: "Customer",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			username: "customer",
			email: "customer@gmail.com",
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

	// .then(() => {
	await queryInterface.bulkInsert("Teams", [
		{
			name: "testingTeam",
			CaptainName: "customer",
			MemberName1: "member1",
			MemberName2: "member2",
			MemberName3: "member3",
			MemberName4: "member4",
			BenchMemberName1: "bench1",
			BenchMemberName2: "bench2",
			statusTeam: "Active",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]);
	// })
	// .then(() => {
	await queryInterface.bulkInsert("Games", [
		{
			name: "League of Legends: Wild Rift",
			gameImg:
				"https://www.riotgames.com/darkroom/1440/08bcc251757a1f64e30e0d7e8c513d35:be16374e056f8268996ef96555c7a113/wr-cb1-announcementarticle-banner-1920x1080.png",
			youtubeUrl: "https://www.youtube.com/watch?v=TFzkbos0oeo",
			gameUrl: "https://wildrift.leagueoflegends.com/en-gb/",
			releaseDate: "2020-10-27",
			developer: "RIOT GAMES",
			genre: "MOBA",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]);
	// })
	// .then(() => {
	await queryInterface.bulkInsert("Locations", [
		{
			name: "Jl. Jakarta",
			ProvinceId: 31,
			RegencyId: 3101,
			DistrictId: 3101010,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]);
	// })
	// .then(() => {
	await queryInterface.bulkInsert("Events", [
		{
			name: "League of Legends: Wild Rift - Esport",
			description:
				"Thank you to all the teams who competed during the season one global championship! We also want to give a huge shout out to all the fans who tuned in during Icons and made this event unforgettable. While this season has wrapped up, stay tuned for more Wild Rift esports announcements coming soon!",
			price: 120000,
			rules:
				"Memasuki season pertama esports Wild Rift, peraturan dan kebijakan kompetisi dibuat untuk melindungi integritas kompetitif dan memastikan ekosistem yang sehat bagi tim, pemain, serta penyelenggara turnamen. Kebijakan dan aturan kompetitif global lengkap dapat ditemukan di sini. - https://www.dropbox.com/sh/z509gfeyo5vnjet/AABPuvrFcgXX5MdQC5DSU1jaa?dl=0",
			size: "4",
			eventStatus: "Active",
			eventPoster: "https://th.bing.com/th/id/OIP.C_o9I8YHGohNXfbsCcS7rQHaEK?pid=ImgDet&rs=1",
			eventDate: "2022-09-21",
			eventType: "Offline",
			UserId: 1,
			GameId: 1,
			LocationId: 1,
			size: 8,
			Bracket: JSON.stringify(require("../template/8slot.json")),
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]);
	// })
	// .then(() => {
	await queryInterface.bulkInsert("Participants", [
		{
			TeamId: 1,
			EventId: 1,
			statusPay: "Paid",
			paymentDate: new Date(),
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]);
	// });
});

afterAll(() => {
	return queryInterface
		.bulkDelete("Users", null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		})
		.then(() => {});
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

describe("GET All User history", () => {
	let access_token;
	describe("Success fetch all user history", () => {
		it("Should return object with data history", async () => {
			let response = await request(app).post("/users/login").send({ username: "customer", password: "password" });
			access_token = response.body.access_token;

			response = await request(app).get("/users/history").set("access_token", access_token);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("Teams", expect.any(Array));
			expect(response.body).toHaveProperty("username", "customer");
		});
	});
});

describe("DELETE Account - FOR ADMIN ONLY", () => {
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
