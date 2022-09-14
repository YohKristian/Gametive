const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let customer_token = "";

beforeAll(() => {
	queryInterface.bulkInsert("Users", [
		{
			username: "customer",
			email: "customer@gmail.com",
			password: hashPassword("12345"),
			role: "Customer",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			username: "customer1",
			email: "customer1@gmail.com",
			password: hashPassword("12345"),
			role: "Customer",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			username: "administrator",
			email: "administrator@gmail.com",
			password: hashPassword("12345"),
			role: "Admin",
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	]);
	queryInterface
		.bulkInsert("Games", [
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
		])
		.then(() => {
			return queryInterface.bulkInsert("Locations", [
				{
					name: "Jl. Jakarta",
					ProvinceId: 31,
					RegencyId: 3171,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		})
		.then(() => {
			return queryInterface.bulkInsert("Events", [
				{
					name: "League of Legends: Wild Rift - Esport (4 Teams)",
					description:
						"Thank you to all the teams who competed during the season one global championship! We also want to give a huge shout out to all the fans who tuned in during Icons and made this event unforgettable. While this season has wrapped up, stay tuned for more Wild Rift esports announcements coming soon!",
					price: 120000,
					rules:
						"Memasuki season pertama esports Wild Rift, peraturan dan kebijakan kompetisi dibuat untuk melindungi integritas kompetitif dan memastikan ekosistem yang sehat bagi tim, pemain, serta penyelenggara turnamen. Kebijakan dan aturan kompetitif global lengkap dapat ditemukan di sini. - https://www.dropbox.com/sh/z509gfeyo5vnjet/AABPuvrFcgXX5MdQC5DSU1jaa?dl=0",
					eventStatus: "Active",
					eventPoster: "https://th.bing.com/th/id/OIP.C_o9I8YHGohNXfbsCcS7rQHaEK?pid=ImgDet&rs=1",
					eventDate: "2022-09-21",
					eventType: "Offline",
					UserId: 1,
					GameId: 1,
					LocationId: 1,
					size: 4,
					Bracket: JSON.stringify(require("../template/4slot.json")),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "League of Legends: Wild Rift - Esport (8 Teams)",
					description:
						"Thank you to all the teams who competed during the season one global championship! We also want to give a huge shout out to all the fans who tuned in during Icons and made this event unforgettable. While this season has wrapped up, stay tuned for more Wild Rift esports announcements coming soon!",
					price: 120000,
					rules:
						"Memasuki season pertama esports Wild Rift, peraturan dan kebijakan kompetisi dibuat untuk melindungi integritas kompetitif dan memastikan ekosistem yang sehat bagi tim, pemain, serta penyelenggara turnamen. Kebijakan dan aturan kompetitif global lengkap dapat ditemukan di sini. - https://www.dropbox.com/sh/z509gfeyo5vnjet/AABPuvrFcgXX5MdQC5DSU1jaa?dl=0",
					eventStatus: "Finished",
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
				{
					name: "League of Legends: Wild Rift - Esport (16 Teams)",
					description:
						"Thank you to all the teams who competed during the season one global championship! We also want to give a huge shout out to all the fans who tuned in during Icons and made this event unforgettable. While this season has wrapped up, stay tuned for more Wild Rift esports announcements coming soon!",
					price: 120000,
					rules:
						"Memasuki season pertama esports Wild Rift, peraturan dan kebijakan kompetisi dibuat untuk melindungi integritas kompetitif dan memastikan ekosistem yang sehat bagi tim, pemain, serta penyelenggara turnamen. Kebijakan dan aturan kompetitif global lengkap dapat ditemukan di sini. - https://www.dropbox.com/sh/z509gfeyo5vnjet/AABPuvrFcgXX5MdQC5DSU1jaa?dl=0",
					eventStatus: "Finished",
					eventPoster: "https://th.bing.com/th/id/OIP.C_o9I8YHGohNXfbsCcS7rQHaEK?pid=ImgDet&rs=1",
					eventDate: "2022-09-21",
					eventType: "Offline",
					UserId: 2,
					GameId: 1,
					LocationId: 1,
					size: 16,
					Bracket: JSON.stringify(require("../template/16slot.json")),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		});
});

afterAll(() => {
	return queryInterface
		.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true })
		.then(() => {
			return queryInterface.bulkDelete("Games", null, { truncate: true, cascade: true, restartIdentity: true });
		})
		.then(() => {
			return queryInterface.bulkDelete("Locations", null, { truncate: true, cascade: true, restartIdentity: true });
		})
		.then(() => {
			return queryInterface.bulkDelete("Events", null, { truncate: true, cascade: true, restartIdentity: true });
		});
});

describe("POST Customers Login", () => {
	describe("Success Login Get Token", () => {
		it("should return object of token", async () => {
			const body = { username: "customer", password: "12345" };
			const response = await request(app).post("/users/login").send(body);
			customer_token = response.body.access_token;
			expect(response.status).toBe(200);
		});
	});
});

describe("GET all event", () => {
	describe("success fetch", () => {
		it("should return array", async () => {
			const response = await request(app).get("/events?page=1&size=&search=");
			console.log(response.body);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("totalItems", expect.any(Number));
			expect(response.body.items).toBeInstanceOf(Array);
			expect(response.body.items[0]).toHaveProperty("id", expect.any(Number));
		});
	});
});

describe("GET all event active and finished", () => {
	describe("success fetch", () => {
		it("should return array", async () => {
			const response = await request(app).get("/events?page=1&size=&search=");
			console.log(response.body);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("totalItems", expect.any(Number));
			expect(response.body.items).toBeInstanceOf(Array);
			expect(response.body.items[0]).toHaveProperty("id", expect.any(Number));
			expect(response.body.items[0]).toHaveProperty("eventStatus", expect.any(String));
		});
	});
});

describe("GET event by id", () => {
	describe("success get event by id", () => {
		it("should be an object", async () => {
			const response = await request(app).get("/events/1");

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("name", expect.any(String));
			expect(response.body).toHaveProperty("description", expect.any(String));
		});
	});

	describe("Fail get event by id", () => {
		it("should return Event not found", async () => {
			const response = await request(app).get("/events/10");

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("code", expect.any(Number));
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});

describe("CREATE event", () => {
	describe("success create event size 4", () => {
		it("should be object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 2,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 4,
			};

			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
		});
	});

	describe("success create event size 8", () => {
		it("should be object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 2,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};

			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
		});
	});

	describe("success create event size 16", () => {
		it("should be object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 2,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 16,
			};

			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
		});
	});

	describe("fail create event - wrong size", () => {
		it("should return error", async () => {
			const body = {
				eventName: "",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 1,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 21);
			expect(response.body).toHaveProperty("message", "only size 4/8/16 are available");
		});
	});

	describe("fail create event - no description", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail create event - no price", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: "",
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});
	describe("fail create event - no rules", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail create event - no poster", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail create event - no date", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "test",
				eventDate: "",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail create event - no type", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "test",
				eventDate: "2022-09-08",
				eventType: "",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail create event - no GameId", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "test",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: "",
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail create event - no locationName", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "test",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail create event - no ProvinceId", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "test",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: "",
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail create event - no RegencyId", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "test",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: "",
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail create event - no token", () => {
		it("should return error", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "test",
				eventDate: "2022-09-08",
				eventType: "online",
				UserId: 1,
				GameId: 1,
				locationName: "Afrika",
				LocationId: 1,
				ProvinceId: 123,
				RegencyId: 123,
				DistrictId: 123,
				size: 8,
			};
			const response = await request(app).post("/events/add").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});

describe("PUT Event", () => {
	describe("success edit event", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				locationName: "Afrika",
				ProvinceId: 123,
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});

	describe("fail edit event - no eventName ", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				locationName: "Afrika",
				ProvinceId: 123,
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail edit event - no description ", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				locationName: "Afrika",
				ProvinceId: 123,
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail edit event - no price ", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: "",
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				locationName: "Afrika",
				ProvinceId: 123,
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail edit event - no rules", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "",
				eventStatus: "Pending",
				eventPoster: "MLBB",
				eventDate: "2022-09-08",
				eventType: "online",
				locationName: "Afrika",
				ProvinceId: 123,
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail edit event - no eventPoster", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "",
				eventDate: "2022-09-08",
				eventType: "online",
				locationName: "Afrika",
				ProvinceId: 123,
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail edit event - no eventDate", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "123",
				eventDate: "",
				eventType: "online",
				locationName: "Afrika",
				ProvinceId: 123,
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});
	describe("fail edit event - no eventType", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "123",
				eventDate: "2022-09-08",
				eventType: "",
				locationName: "Afrika",
				ProvinceId: 123,
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});
	describe("fail edit event - no locationName", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "123",
				eventDate: "2022-09-08",
				eventType: "online",
				locationName: "",
				ProvinceId: 123,
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});
	describe("fail edit event - no ProvinceId", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "123",
				eventDate: "2022-09-08",
				eventType: "online",
				locationName: "Afrika",
				ProvinceId: "",
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail edit event - no RegencyId", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "123",
				eventDate: "2022-09-08",
				eventType: "online",
				locationName: "Afrika",
				ProvinceId: 123,
				RegencyId: "",
			};
			const response = await request(app).put("/events/1").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(Array));
		});
	});

	describe("fail edit event - no token", () => {
		it("should be an object", async () => {
			const body = {
				eventName: "MLBB",
				description: "MLBB",
				price: 2000,
				rules: "test",
				eventStatus: "Pending",
				eventPoster: "123",
				eventDate: "2022-09-08",
				eventType: "online",
				locationName: "Afrika",
				ProvinceId: 123,
				RegencyId: 123,
			};
			const response = await request(app).put("/events/1").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});

describe("PUT Bracket for specific events", () => {
	let newBracket =
		'{"participant":[{"id":0,"tournament_id":0,"name":"A"},{"id":1,"tournament_id":0,"name":"B"},{"id":2,"tournament_id":0,"name":"C"},{"id":3,"tournament_id":0,"name":"D"},{"id":4,"tournament_id":0,"name":"E"},{"id":5,"tournament_id":0,"name":"F"},{"id":6,"tournament_id":0,"name":"G"},{"id":7,"tournament_id":0,"name":"H"}],"stage":[{"id":0,"tournament_id":0,"name":"New Event","type":"single_elimination","number":1,"settings":{"seedOrdering":["natural"],"consolationFinal":false,"matchesChildCount":0,"size":8}}],"group":[{"id":0,"stage_id":0,"number":1}],"round":[{"id":0,"number":1,"stage_id":0,"group_id":0},{"id":1,"number":2,"stage_id":0,"group_id":0},{"id":2,"number":3,"stage_id":0,"group_id":0}],"match":[{"id":0,"number":1,"stage_id":0,"group_id":0,"round_id":0,"child_count":0,"status":2,"opponent1":{"id":0,"position":1},"opponent2":{"id":1,"position":2}},{"id":1,"number":2,"stage_id":0,"group_id":0,"round_id":0,"child_count":0,"status":2,"opponent1":{"id":2,"position":3},"opponent2":{"id":3,"position":4}},{"id":2,"number":3,"stage_id":0,"group_id":0,"round_id":0,"child_count":0,"status":2,"opponent1":{"id":4,"position":5},"opponent2":{"id":5,"position":6}},{"id":3,"number":4,"stage_id":0,"group_id":0,"round_id":0,"child_count":0,"status":2,"opponent1":{"id":6,"position":7},"opponent2":{"id":7,"position":8}},{"id":4,"number":1,"stage_id":0,"group_id":0,"round_id":1,"child_count":0,"status":0,"opponent1":{"id":null},"opponent2":{"id":null}},{"id":5,"number":2,"stage_id":0,"group_id":0,"round_id":1,"child_count":0,"status":0,"opponent1":{"id":null},"opponent2":{"id":null}},{"id":6,"number":1,"stage_id":0,"group_id":0,"round_id":2,"child_count":0,"status":0,"opponent1":{"id":null},"opponent2":{"id":null}}],"match_game":[]}';
	describe("Success edit Bracket", () => {
		it("should return object with event name and message", async () => {
			const body = { bracket: newBracket };

			const response = await request(app).put("/events/1/bracket").send(body).set("access_token", customer_token);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("event", expect.any(String));
			expect(response.body).toHaveProperty("message", "bracket has been changed");
		});
	});

	describe("Failed edit Bracket - the editor is not the user responsible", () => {
		it("should return object with code and message", async () => {
			const body = { bracket: newBracket };

			const response = await request(app).put("/events/3/bracket").send(body).set("access_token", customer_token);

			expect(response.status).toBe(403);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 5);
			expect(response.body).toHaveProperty("message", "invalid authorization");
		});
	});

	describe("Failed edit Bracket - the editor is not the user responsible", () => {
		it("should return object with code and message", async () => {
			const body = { bracket: newBracket };

			const response = await request(app).put("/events/10/bracket").send(body).set("access_token", customer_token);

			console.log(response.body);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 404);
			expect(response.body).toHaveProperty("message", "data not found");
		});
	});

	describe("Failed edit Bracket - no login token", () => {
		it("should return object with error code and message", async () => {
			const body = { bracket: newBracket };

			const response = await request(app).put("/events/1/bracket").send(body);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 6);
			expect(response.body).toHaveProperty("message", "invalid access_token");
		});
	});
});

describe("GET Event list of self", () => {
	let access_token;
	describe("Success fetch event list of self", () => {
		it("should return array of object of list of self", async () => {
			//login
			const credential = { username: "customer", password: "12345" };
			let response = await request(app).post("/users/login").send(credential);
			access_token = response.body.access_token;

			//fetch event of self
			response = await request(app).get("/events/forUser?page=1&size=4&search=").set("access_token", access_token);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("totalItems", expect.any(Number));
			expect(response.body).toHaveProperty("items", expect.any(Array));
			expect(response.body).toHaveProperty("totalPages", expect.any(Number));
			expect(response.body).toHaveProperty("currentPage", expect.any(Number));
		});
	});

	describe("failed fetch event list of self - invalid token", () => {
		it("should return object with code and message", async () => {
			//login
			const credential = { username: "customer", password: "12345" };
			let response = await request(app).post("/users/login").send(credential);
			access_token = response.body.access_token;

			//fetch event of self
			response = await request(app).get("/events/forUser?page=1&size=4&search=");

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 6);
			expect(response.body).toHaveProperty("message", "invalid access_token");
		});
	});
});

describe("PATCH Status event - FOR ADMIN ONLY", () => {
	let access_token;
	describe("Success patch status from pending -> active", () => {
		it("should return 1", async () => {
			const credential = { username: "customer", password: "12345" };
			let response = await request(app).post("/users/login").send(credential);
			access_token = response.body.access_token;

			response = await request(app).patch("/events/1").send({ eventStatus: "Active" }).set("access_token", access_token);

			expect(response.status).toBe(200);
			expect(response.body).toBe(1);
		});
	});

	describe("Failed patch status from pending -> empty - empty eventStatus body", () => {
		it("should return object with code and message", async () => {
			const credential = { username: "customer", password: "12345" };
			let response = await request(app).post("/users/login").send(credential);
			access_token = response.body.access_token;

			response = await request(app).patch("/events/1").send({ eventStatus: null }).set("access_token", access_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 23);
			expect(response.body).toHaveProperty("message", "event status cannot be empty");
		});
	});

	describe("Failed patch status from pending -> empty - id is not found", () => {
		it("should return object with code and message", async () => {
			const credential = { username: "customer", password: "12345" };
			let response = await request(app).post("/users/login").send(credential);
			access_token = response.body.access_token;

			response = await request(app).patch("/events/1000").send({ eventStatus: "Active" }).set("access_token", access_token);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 404);
			expect(response.body).toHaveProperty("message", "data not found");
		});
	});
});
