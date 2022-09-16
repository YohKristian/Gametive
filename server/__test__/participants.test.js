const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

// Token from login test
let customer_token = "";
let not_organizer_token = "";

beforeAll(() => {
	// Insert Dummy User
	return queryInterface
		.bulkInsert(
			"Users",
			[
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
			],
			{},
		)
		.then(() => {
			return queryInterface.bulkInsert(
				"Teams",
				[
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
					{
						name: "testingTeam2",
						CaptainName: "customer",
						MemberName1: "",
						MemberName2: "",
						MemberName3: "",
						MemberName4: "",
						BenchMemberName1: "bench1",
						BenchMemberName2: "",
						statusTeam: "Inactive",
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						name: "testingTeam Cust1",
						CaptainName: "customer1",
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
					{
						name: "testingTeam2 Cust1",
						CaptainName: "customer1",
						MemberName1: "member11",
						MemberName2: "member21",
						MemberName3: "member31",
						MemberName4: "member41",
						BenchMemberName1: "bench11",
						BenchMemberName2: "bench21",
						statusTeam: "Active",
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				],
				{},
			);
		})
		.then(() => {
			return queryInterface.bulkInsert("Games", [
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
		})
		.then(() => {
			return queryInterface.bulkInsert("Locations", [
				{
					name: "Jl. Jakarta",
					ProvinceId: 31,
					RegencyId: 3101,
					DistrictId: 3101010,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		})
		.then(() => {
			return queryInterface.bulkInsert("Events", [
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
		})
		.then(() => {
			return queryInterface.bulkInsert(
				"Participants",
				[
					{
						TeamId: 2,
						EventId: 1,
						statusPay: "Paid",
						paymentDate: new Date(),
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				],
				{},
			);
		});
});

// Delete Dummy User After All Test
afterAll(() => {
	return queryInterface
		.bulkDelete("Users", null, {
			truncate: true,
			cascade: true,
			restartIdentity: true,
		})
		.then(() => {
			return queryInterface.bulkDelete("Teams", null, {
				truncate: true,
				cascade: true,
				restartIdentity: true,
			});
		})
		.then(() => {
			return queryInterface.bulkDelete("Games", null, {
				truncate: true,
				cascade: true,
				restartIdentity: true,
			});
		})
		.then(() => {
			return queryInterface.bulkDelete("Locations", null, {
				truncate: true,
				cascade: true,
				restartIdentity: true,
			});
		})
		.then(() => {
			return queryInterface.bulkDelete("Events", null, {
				truncate: true,
				cascade: true,
				restartIdentity: true,
			});
		})
		.then(() => {
			return queryInterface.bulkDelete("Participants", null, {
				truncate: true,
				cascade: true,
				restartIdentity: true,
			});
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

describe("GET All Participants", () => {
	describe("Success GET All Participants - token customer", () => {
		it("should return array of object of all participants", async () => {
			const response = await request(app).get("/participants").set("access_token", customer_token);
			// console.log(response.body, "KIW");
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Array);
			expect(response.body[0]).toHaveProperty("id", expect.any(Number));
			expect(response.body[0]).toHaveProperty("TeamId", expect.any(Number));
			expect(response.body[0]).toHaveProperty("EventId", expect.any(Number));
			expect(response.body[0]).toHaveProperty("statusPay", expect.any(String));
			expect(response.body[0]).toHaveProperty("paymentDate", expect.any(String));
			expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
			expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
			expect(response.body[0]).toHaveProperty("Team", expect.any(Object));
			expect(response.body[0].Team).toBeInstanceOf(Object);
			expect(response.body[0]).toHaveProperty("Event", expect.any(Object));
			expect(response.body[0].Event).toBeInstanceOf(Object);
		});
	});

	describe("Success GET Participants By Event Id - token customer", () => {
		it("should return an object of participants by event id", async () => {
			const EventId = 1;
			const response = await request(app).get(`/participants/${EventId}`).set("access_token", customer_token);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("id", 1);
			expect(response.body).toHaveProperty("TeamId", expect.any(Number));
			expect(response.body).toHaveProperty("EventId", expect.any(Number));
			expect(response.body).toHaveProperty("statusPay", expect.any(String));
			expect(response.body).toHaveProperty("paymentDate", expect.any(String));
			expect(response.body).toHaveProperty("createdAt", expect.any(String));
			expect(response.body).toHaveProperty("updatedAt", expect.any(String));
			expect(response.body).toHaveProperty("Team", expect.any(Object));
			expect(response.body.Team).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("Event", expect.any(Object));
			expect(response.body.Event).toBeInstanceOf(Object);
		});
	});

	describe("Success POST Create Participants - token customer", () => {
		it("should return an object of participants", async () => {
			let body = { username: "customer1", password: "12345" };
			let response = await request(app).post("/users/login").send(body);
			not_organizer_token = response.body.access_token;

			response = await request(app).post(`/participants`).set("access_token", not_organizer_token).send({
				TeamId: 4,
				EventId: 1,
			});

			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("TeamId", expect.any(Number));
			expect(response.body).toHaveProperty("EventId", expect.any(Number));
			expect(response.body).toHaveProperty("statusPay", expect.any(String));
			expect(response.body).toHaveProperty("paymentDate", expect.any(String));
			expect(response.body).toHaveProperty("createdAt", expect.any(String));
			expect(response.body).toHaveProperty("updatedAt", expect.any(String));
		});
	});

	describe("Success PUT Update Status Pay By Event Id and Team Id - token customer", () => {
		it("should return an object of participants", async () => {
			const EventId = 1;
			const TeamId = 4;
			const response = await request(app).put(`/participants/${EventId}/${TeamId}`).set("access_token", not_organizer_token);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("EventId", expect.any(Number));
			expect(response.body).toHaveProperty("EventId", EventId);
			expect(response.body).toHaveProperty("TeamId", expect.any(Number));
			expect(response.body).toHaveProperty("TeamId", TeamId);
			expect(response.body).toHaveProperty("statusPay", expect.any(String));
			expect(response.body).toHaveProperty("statusPay", "Paid");
			expect(response.body).toHaveProperty("paymentDate", expect.any(String));
			expect(response.body).toHaveProperty("createdAt", expect.any(String));
			expect(response.body).toHaveProperty("updatedAt", expect.any(String));
		});
	});

	describe("failed create participant - participant already paid", () => {
		it("should return object with code and message", async () => {
			const body = { TeamId: 4, EventId: 1 };
			const response = await request(app).post("/participants").send(body).set("access_token", not_organizer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 80);
			expect(response.body).toHaveProperty("message", "team already registered!");
		});
	});

	describe("Success DELETE Participants By Event Id and Team Id - token customer", () => {
		it("should return an object of participant", async () => {
			const EventId = 1;
			const TeamId = 4;

			const response = await request(app).delete(`/participants/${EventId}/${TeamId}`).set("access_token", customer_token);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("id", expect.any(Number));
			expect(response.body).toHaveProperty("EventId", expect.any(Number));
			expect(response.body).toHaveProperty("EventId", EventId);
			expect(response.body).toHaveProperty("TeamId", expect.any(Number));
			expect(response.body).toHaveProperty("TeamId", TeamId);
			expect(response.body).toHaveProperty("statusPay", expect.any(String));
			expect(response.body).toHaveProperty("paymentDate", expect.any(String));
			expect(response.body).toHaveProperty("createdAt", expect.any(String));
			expect(response.body).toHaveProperty("updatedAt", expect.any(String));
		});
	});

	describe("Fail GET All Participants - no token", () => {
		it("should return object", async () => {
			const response = await request(app).get("/participants");

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", expect.any(Number));
			expect(response.body).toHaveProperty("message", expect.any(String));
		});
	});
});

describe("POST create participant", () => {
	describe("failed create participant - invalid form", () => {
		it("should return object with code and message", async () => {
			const body = {};
			const response = await request(app).post("/participants").send(body).set("access_token", customer_token);

			expect(response.status).toBe(400);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 1);
			expect(response.body).toHaveProperty("message", "invalid form data, please check your input");
		});
	});
});

describe("PUT update payment", () => {
	describe("failed change status payment - participant not found", () => {
		it("Should return object with code and message", async () => {
			let response = await request(app).put("/participants/999/999").set("access_token", customer_token);

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("code", 404);
			expect(response.body).toHaveProperty("message", "data not found");
		});
	});
});

describe("GET All Participants on specific event", () => {
	describe("Success fetch all participants on certain event id", () => {
		it("should return array of object of said event's participants", async () => {
			let response = await request(app).get("/participants/1").set("access_token", customer_token);

			console.log(response.body);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("failed fetch all participants on certain event id - event id not found", () => {
		it("should return array of object of said event's participants", async () => {
			let response = await request(app).get("/participants/999").set("access_token", customer_token);

			console.log(response.body);
			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
		});
	});
});

describe("DELETE participants by event id & team id", () => {
	describe("Success delete participants by event id & team id", () => {
		it("should return object of said participant", async () => {
			let response = await request(app).delete("/participants/1/2").set("access_token", customer_token);

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
		});
	});

	describe("failed delete participants by event id & team id", () => {
		it("should return object with code and message", async () => {
			let response = await request(app).delete("/participants/99/99").set("access_token", customer_token);

			expect(response.status).toBe(404);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toHaveProperty("code", 404);
			expect(response.body).toHaveProperty("message", "data not found");
		});
	});
});
