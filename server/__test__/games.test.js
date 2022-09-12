const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const fs = require("fs");
const { hashPassword } = require("../helpers/bcryptjs");
let admin_token = "";

beforeAll(async () => {
	let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
	users.forEach((x) => {
		x.createdAt = new Date();
		x.updatedAt = new Date();
		x.password = hashPassword(x.password);
	});
	await queryInterface.bulkInsert("Users", users, {});

	let games = JSON.parse(fs.readFileSync("./data/games.json", "utf-8"));
	games.forEach((x) => {
		x.createdAt = new Date();
		x.updatedAt = new Date();
	});
	await queryInterface.bulkInsert("Games", games, {});
});

afterAll(async () => {
	await queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
	await queryInterface.bulkDelete("Games", null, { truncate: true, cascade: true, restartIdentity: true });
});

// Login
describe("POST Admin Login", () => {
	describe("Success Login Get Token", () => {
		it("should return object of token", async () => {
			const body = { username: "admin", password: "12345" };

			const response = await request(app).post("/users/login").send(body);

			admin_token = response.body.access_token;
			expect(response.status).toBe(200);
		});
	});
});

//Read games

describe("GET /games", () => {
	describe("GET /games - success test", () => {
		it("should be return an array of games data from database", async () => {
			const response = await request(app).get("/games?page=1&size=3&search");
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("GET /games - failed test - overflow page", () => {
		it("should be return an array of games data from database", async () => {
			const response = await request(app).get("/games?page=-1&size=3&search");
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
		});
	});
});

//Read game by id

describe("GET /games/:gamesId", () => {
	describe("GET /games/:gamesId - success test", () => {
		it("should be return a game data from database", async () => {
			const response = await request(app).get("/games/1");
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("GET /games/:gamesId - error", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).get("/games/a");
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});

//Create games

describe("POST /games", () => {
	describe("POST /games - success test", () => {
		it("should be return an object of game data", async () => {
			const body = {
				name: "testing",
				gameImg: "testing",
				youtubeUrl: "testing",
				gameUrl: "testing",
				releaseDate: "2022-01-01",
				developer: "testing",
				genre: "testing",
			};

			const response = await await request(app).post("/games").send(body).set("access_token", admin_token);
			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("POST /games - error", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).post("/games").set("access_token", admin_token);
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("POST /games - error", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).post("/games").set("access_token", "");
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});

//Update games

describe("PUT /games/:gamesId", () => {
	describe("PUT /games/:gamesId - success test", () => {
		it("should be return an object of game data", async () => {
			const body = {
				name: "testing",
				gameImg: "testing",
				youtubeUrl: "testing",
				gameUrl: "testing",
				releaseDate: "2022-01-01",
				developer: "testing",
				genre: "testing",
			};

			const response = await request(app).put("/games/1").send(body).set("access_token", admin_token);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("PUT /games/:gamesId - error - id not found", () => {
		it("should be return object with code and message", async () => {
			const body = {
				name: "testing",
				gameImg: "testing",
				youtubeUrl: "testing",
				gameUrl: "testing",
				releaseDate: "2022-01-01",
				developer: "testing",
				genre: "testing",
			};

			const response = await request(app).put("/games/1000").send(body).set("access_token", admin_token);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 404);
			expect(response.body).toHaveProperty("message", "data not found");
		});
	});

	describe("PUT /games/:gamesId - error", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).put("/games/a").set("access_token", "");
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("PUT /games/:gamesId - error", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).put("/games/a").set("access_token", admin_token);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});

// Delete games
describe("DEL /games/:gamesId", () => {
	describe("DEL /games/:gamesId - success test", () => {
		it("should be return an object of game data", async () => {
			const response = await await request(app).del("/games/1").set("access_token", admin_token);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("DEL /games/:gamesId - error", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).del("/games/a").set("access_token", "");
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("DEL /games/:gamesId - error", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).del("/games/a").set("access_token", admin_token);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("DEL /games/:gamesId - error no game found", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).del("/games/1000").set("access_token", admin_token);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});
