const request = require('supertest');
const app = require('../app.js');
const { hashPassword } = require('../helpers/bcryptjs.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

// Token from login test
let customer_token = "";

// Insert Dummy User
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
                    size: "8",
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
                        TeamId: 1,
                        EventId: 1,
                        statusPay: "Unpaid",
                        paymentDate: new Date(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
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

describe('POST Customers Login', () => {
    describe('Success Login Get Token', () => {
        it('should return object of token', async () => {
            const body = { username: "customer", password: "12345" };

            const response = await request(app)
                .post('/users/login')
                .send(body);

            customer_token = response.body.access_token;
            expect(response.status).toBe(200);
        });
    });
});

describe('POST Snap Token Midtrans', () => {
    describe('Success POST Snap Token Midtrans - token customer', () => {
        it('should return array of object of token', async () => {
            const body = { totalCostNeedToPay: 10000, TeamId: 1, EventId: 1 }
            const response = await request(app)
                .post('/midtrans/snap-token')
                .send(body)
                .set('access_token', customer_token)

            expect(response.status).toBe(201);
        });
    });

    describe('Fail POST Snap Token Midtrans - no price', () => {
        it('should return status 500', async () => {
            const body = { totalCostNeedToPay: undefined, TeamId: 1, EventId: 1 }
            const response = await request(app)
                .post('/midtrans/snap-token')
                .send(body)
                .set('access_token', customer_token)

            // console.log(response.MidtransError);

            expect(response.status).toBe(500);
        });
    });

    describe('Fail POST Snap Token Midtrans - no token', () => {
        it('should return object', async () => {
            const body = { totalCostNeedToPay: 10000, TeamId: 1, EventId: 1 }
            const response = await request(app)
                .post('/midtrans/snap-token')
                .send(body)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('code', expect.any(Number));
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });
});

describe("PUT change status to paid", () => {
    describe("Success change status payment", () => {
        it("Should return said participant with changed status", async () => {
            const teamId = 1;
            const eventId = 1;
            let response = await request(app)
                .post("/midtrans/change-status-to-payed")
                .send({ transaction_status: "capture", order_id: `ORDERID-${Date.now()}-${+teamId}-${+eventId}` })
                .set("access_token", customer_token);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });

    describe("Fail change status payment - wrong transaction status", () => {
        it("Should return said participant with changed status", async () => {
            const teamId = 1;
            const eventId = 1;
            let response = await request(app)
                .post("/midtrans/change-status-to-payed")
                .send({ transaction_status: "deny", order_id: `ORDERID-${Date.now()}-${teamId}-${eventId}` })
                .set("access_token", customer_token);

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('code', expect.any(Number));
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });

    describe("Fail change status payment - participant not found", () => {
        it("Should return object with code and message", async () => {
            const teamId = 999;
            const eventId = 999;
            let response = await request(app)
                .post("/midtrans/change-status-to-payed")
                .send({ transaction_status: "capture", order_id: `ORDERID-${Date.now()}-${teamId}-${eventId}` })
                .set("access_token", customer_token);

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("code", 404);
            expect(response.body).toHaveProperty("message", "data not found");
        });
    });
});