const request = require("supertest");
const app = require("../app.js");
const { hashPassword } = require("../helpers/bcryptjs.js");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

// Token from login test
let customer_token = "";
let reqBracket = require("../template/4slot.json");

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
					gameImg: "https://www.riotgames.com/darkroom/1440/08bcc251757a1f64e30e0d7e8c513d35:be16374e056f8268996ef96555c7a113/wr-cb1-announcementarticle-banner-1920x1080.png",
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
					RegencyId: 3171,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		})
		.then(() => {
			return queryInterface.bulkInsert("Events", [
				{
					name: "League of Legends: Wild Rift - Esport",
					description: "Thank you to all the teams who competed during the season one global championship! We also want to give a huge shout out to all the fans who tuned in during Icons and made this event unforgettable. While this season has wrapped up, stay tuned for more Wild Rift esports announcements coming soon!",
					price: 120000,
					rules: "Memasuki season pertama esports Wild Rift, peraturan dan kebijakan kompetisi dibuat untuk melindungi integritas kompetitif dan memastikan ekosistem yang sehat bagi tim, pemain, serta penyelenggara turnamen. Kebijakan dan aturan kompetitif global lengkap dapat ditemukan di sini. - https://www.dropbox.com/sh/z509gfeyo5vnjet/AABPuvrFcgXX5MdQC5DSU1jaa?dl=0",
					size: "4",
					eventStatus: "Active",
					eventPoster: "https://th.bing.com/th/id/OIP.C_o9I8YHGohNXfbsCcS7rQHaEK?pid=ImgDet&rs=1",
					eventDate: "2022-09-21",
					eventType: "Offline",
					UserId: 1,
					GameId: 1,
					LocationId: 1,
					Bracket: JSON.stringify(reqBracket),
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
						TeamId: 1,
						EventId: 1,
						paymentDate: new Date(),
						createdAt: new Date(),
						updatedAt: new Date(),
					},
					{
						TeamId: 2,
						EventId: 1,
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
			const response = await request(app).post(`/participants`).set("access_token", customer_token).send({
				TeamId: 1,
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
			const TeamId = 1;
			const response = await request(app).put(`/participants/${EventId}/${TeamId}`).set("access_token", customer_token);

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

	describe("Success DELETE Participants By Event Id and Team Id - token customer", () => {
		it("should return an object of participant", async () => {
			const EventId = 1;
			const TeamId = 1;
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
