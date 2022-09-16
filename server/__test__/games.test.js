const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const fs = require("fs");
const { hashPassword } = require("../helpers/bcryptjs");
const { redis } = require("../config/redis");
// const Redis = require("ioredis-mock");
// const redis = new Redis({
// 	data: {
// 		"app:games": {
// 			totalItems: 12,
// 			items: [
// 				{
// 					id: 1,
// 					name: "League of Legends: Wild Rift",
// 					gameImg:
// 						"https://www.riotgames.com/darkroom/1440/08bcc251757a1f64e30e0d7e8c513d35:be16374e056f8268996ef96555c7a113/wr-cb1-announcementarticle-banner-1920x1080.png",
// 					youtubeUrl: "https://www.youtube.com/watch?v=TFzkbos0oeo",
// 					gameUrl: "https://wildrift.leagueoflegends.com/en-gb/",
// 					releaseDate: "2020-10-27",
// 					developer: "RIOT GAMES",
// 					genre: "Multiplayer online battle arena",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 				{
// 					id: 2,
// 					name: "Mobile Legends: Bang Bang",
// 					gameImg:
// 						"https://cdn0-production-images-kly.akamaized.net/Hyl2S_OHDEDCGayRTeriz3hPi38=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3488932/original/008102000_1624278462-Mobile_Legends_11.jpg",
// 					youtubeUrl: "https://www.youtube.com/watch?v=cftqT7au9gk",
// 					gameUrl: "https://m.mobilelegends.com/en",
// 					releaseDate: "2016-07-14",
// 					developer: "Moonton",
// 					genre: "Multiplayer online battle arena",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 				{
// 					id: 3,
// 					name: "Arena Of Valor",
// 					gameImg: "https://gamebrott.com/wp-content/uploads/2020/11/arena_of_valor.jpg",
// 					youtubeUrl: "https://www.youtube.com/watch?v=JM_UdSUW1ao",
// 					gameUrl: "https://www.arenaofvalor.com/",
// 					releaseDate: "2016-10-13",
// 					developer: "Tencet Games",
// 					genre: "Multiplayer online battle arena",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 				{
// 					id: 4,
// 					name: "VALORANT",
// 					gameImg:
// 						"https://cdn1-production-images-kly.akamaized.net/2cz3nNAb61C_WtZDIByp9jys2Ww=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3142622/original/000361800_1591163362-valorant-2.jpg",
// 					youtubeUrl: "https://www.youtube.com/watch?v=IhhjcB2ZjIM",
// 					gameUrl: "https://playvalorant.com/id-id/",
// 					releaseDate: "2020-06-02",
// 					developer: "RIOT GAMES",
// 					genre: "FPS",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 				{
// 					id: 5,
// 					name: "CS:GO",
// 					gameImg: "https://estnn.com/wp-content/uploads/2022/05/20491388.jpg",
// 					youtubeUrl: "https://www.youtube.com/watch?v=edYCtaNueQY",
// 					gameUrl: "https://blog.counter-strike.net/",
// 					releaseDate: "2012-08-21",
// 					developer: "Valve Corporation",
// 					genre: "FPS",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 				{
// 					id: 6,
// 					name: "Garena Free Fire",
// 					gameImg: "https://aidsindonesia.or.id/wp-content/uploads/2021/12/Garena-Free-Fire.jpg",
// 					youtubeUrl: "https://www.youtube.com/watch?v=pKUu6PKNyzk",
// 					gameUrl: "https://ff.garena.com/en/",
// 					releaseDate: "2017-12-04",
// 					developer: "111dots Studio",
// 					genre: "Battle royale",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 				{
// 					id: 7,
// 					name: "PUBG Mobile",
// 					gameImg: "https://c4.wallpaperflare.com/wallpaper/320/205/156/pubg-mobile-wallpaper-preview.jpg",
// 					youtubeUrl: "https://www.youtube.com/watch?v=uCd6tbUAy6o",
// 					gameUrl: "https://www.pubgmobile.com/id/home.shtml",
// 					releaseDate: "2018-03-19",
// 					developer: "Tencent Games",
// 					genre: "Battle royale",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 				{
// 					id: 8,
// 					name: "DOTA 2",
// 					gameImg: "https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg?t=1662588548",
// 					youtubeUrl: "https://www.youtube.com/watch?v=SmnqsdeHFT0",
// 					gameUrl: "https://www.dota2.com",
// 					releaseDate: "2013-07-09",
// 					developer: "Valve Corporation",
// 					genre:
// 						"Multiplayer online battle arena, Entertainment, Fantasy, Action role-playing game, Speculative fiction, Societal",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 				{
// 					id: 9,
// 					name: "FIFA 23",
// 					gameImg: "https://assets.promediateknologi.com/crop/0x0:0x0/x/photo/2022/07/20/3788213003.jpg",
// 					youtubeUrl: "https://www.youtube.com/watch?v=o3V-GvvzjE4",
// 					gameUrl: "https://www.pubgmobile.com/id/home.shtml",
// 					releaseDate: "2022-09-30",
// 					developer: "EA Vancouver, EA Canada & EA Romania",
// 					genre: "Sports Video Game, Simulation Game, Simulation, Sports",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 				{
// 					id: 10,
// 					name: "TEKKEN 7",
// 					gameImg: "https://image.api.playstation.com/vulcan/img/rnd/202111/1200/u36iCgbHmBSZoHOIm3GeKmii.jpg?w=940&thumb=false",
// 					youtubeUrl: "https://www.youtube.com/watch?v=1V-_q3SKh5w",
// 					gameUrl: "https://tk7.tekken.com",
// 					releaseDate: "2015-02-18",
// 					developer: "BNE Entertainment, BANDAI NAMCO Studios",
// 					genre: "Fighting game, Sports Video Game, Beat 'em up, Simulation Game",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 				{
// 					id: 11,
// 					name: "NBA 2K23",
// 					gameImg:
// 						"https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2022/07/08/6ebaff4b-0bff-493f-9e0d-8b1f3276-20220708013259.jpg",
// 					youtubeUrl: "https://www.youtube.com/watch?v=rBZ_q6wIJKY",
// 					gameUrl: "https://nba.2k.com/2k23/",
// 					releaseDate: "2022-09-09",
// 					developer: "Tencent Games",
// 					genre: "Simulation Video Game, Sports Video Game, Simulation Game, Simulation, Sports",
// 					createdAt: new Date(),
// 					updatedAT: new Date(),
// 				},
// 			],
// 			totalPages: 1,
// 			currentPages: 1,
// 		},
// 	},
// });

// async function hehe() {
// 	let data = await redis.get("app:games");
// 	console.log(data, "ASOOOOOOOOOOOOO");
// }
// hehe();
let admin_token = "";

beforeAll(async () => {
	await redis.del("app:games:page");
	await redis.get("app:games");

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
			const body = { username: "fajar", password: "12345" };

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
			console.log(response.body, "<-------ke 1");
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("GET /games - success test", () => {
		it("should be return an array of games data from database", async () => {
			const response = await request(app).get("/games?page=1&size=3&search");

			console.log(response.body, "<--------ke 2");
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
			const response = await await request(app).patch("/games/1").set("access_token", admin_token);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("DEL /games/:gamesId - error", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).patch("/games/a").set("access_token", "");
			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("DEL /games/:gamesId - error", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).patch("/games/a").set("access_token", admin_token);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("DEL /games/:gamesId - error no game found", () => {
		it("should be return an object with message", async () => {
			const response = await request(app).patch("/games/1000").set("access_token", admin_token);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message");
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});
