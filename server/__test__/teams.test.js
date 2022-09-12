const request = require('supertest');
const app = require('../app.js');
const { hashPassword } = require('../helpers/bcryptjs.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

// Token from login test
let customer_token = "";

// Insert Dummy User
beforeAll(() => {
    return queryInterface.bulkInsert(
        "Users",
        [
            {
                username: "customer",
                email: "customer@gmail.com",
                password: hashPassword("12345"),
                role: "Customer",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: "customer1",
                email: "customer1@gmail.com",
                password: hashPassword("12345"),
                role: "Customer",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        {}
    )
})

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

describe('GET All Teams', () => {
    // Dummy Team
    beforeAll(() => {
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
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: "testingTeam",
                    CaptainName: "customer",
                    MemberName1: "",
                    MemberName2: "",
                    MemberName3: "",
                    MemberName4: "",
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: "testingTeam1",
                    CaptainName: "customer1",
                    MemberName1: "member",
                    MemberName2: "",
                    MemberName3: "",
                    MemberName4: "",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            {}
        )
    })

    describe('Success GET All Teams - token customer', () => {
        it('should return array of object of all teams', async () => {
            const response = await request(app)
                .get('/teams/all-teams')
                .set('access_token', customer_token)

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]).toHaveProperty('id', expect.any(Number));
            expect(response.body[0]).toHaveProperty('name', expect.any(String));
            expect(response.body[0]).toHaveProperty('CaptainName', expect.any(String));
        });
    });

    describe('Fail GET All Teams - no token', () => {
        it('should return object', async () => {
            const response = await request(app)
                .get('/teams/all-teams')

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('code', expect.any(Number));
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });
});

describe('GET Detail Teams', () => {
    describe('Success GET Detail Teams - token customer', () => {
        it('should return array of object of detail team', async () => {
            const response = await request(app)
                .get('/teams/1')
                .set('access_token', customer_token)

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('id', expect.any(Number));
            expect(response.body).toHaveProperty('name', expect.any(String));
            expect(response.body).toHaveProperty('CaptainName', expect.any(String));
        });
    });

    describe('Fail GET Detail Teams - wrong teamId 999', () => {
        it('should return of object', async () => {
            const response = await request(app)
                .get('/teams/999')
                .set('access_token', customer_token)

            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('code', expect.any(Number));
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });

    describe('Fail GET Team Detail - no token', () => {
        it('should return object', async () => {
            const response = await request(app)
                .get('/teams/1')

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('code', expect.any(Number));
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });
});

describe('POST Create Teams', () => {
    describe('Success POST Create Teams - token customer', () => {
        it('should return object of team', async () => {
            const body = { name: "Burstmon", MemberName1: "Shiki" };

            const response = await request(app)
                .post('/teams/create')
                .send(body)
                .set('access_token', customer_token)

            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('id', expect.any(Number));
            expect(response.body).toHaveProperty('name', expect.any(String));
            expect(response.body).toHaveProperty('CaptainName', expect.any(String));
        });
    });

    describe('Fail POST Create Teams - no name', () => {
        it('should return object of team', async () => {
            const body = { name: "", MemberName1: "Shikigami" };

            const response = await request(app)
                .post('/teams/create')
                .send(body)
                .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        });
    });

    describe('Fail POST Create Team - no token', () => {
        it('should return object', async () => {
            const response = await request(app)
                .post('/teams/1')

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('code', expect.any(Number));
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });
});

describe('PUT Edit Teams', () => {
    describe('Success PUT Edit Teams - token customer', () => {
        it('should return array of num', async () => {
            const body = { name: "Burstmon", MemberName1: "Shiki" };

            const response = await request(app)
                .put('/teams/edit/4')
                .send(body)
                .set('access_token', customer_token)

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body).toContain(1);
        });
    });

    describe('Fail PUT Edit Teams - wrong teamId 999', () => {
        it('should return of object', async () => {
            const response = await request(app)
                .get('/teams/edit/999')
                .set('access_token', customer_token)

            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('Fail PUT Edit Team - no token', () => {
        it('should return object', async () => {
            const response = await request(app)
                .put('/teams/4')

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('code', expect.any(Number));
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });
});

describe('PATCH Delete Teams', () => {
    // Reset DB
    afterAll(() => {
        return queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true })
            .then(() => {
                return queryInterface.bulkDelete("Teams", null, { truncate: true, cascade: true, restartIdentity: true })
            });
    })

    describe('Success PATCH Delete Teams - token customer', () => {
        it('should return object of message', async () => {
            const response = await request(app)
                .patch('/teams/delete/4')
                .set('access_token', customer_token)

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });

    describe('Fail PATCH Delete Teams - wrong teamId 999', () => {
        it('should return of object', async () => {
            const response = await request(app)
                .get('/teams/delete/999')
                .set('access_token', customer_token)

            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
        });
    });

    describe('Fail PATCH Delete Team - no token', () => {
        it('should return object', async () => {
            const response = await request(app)
                .delete('/teams/1')

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('code', expect.any(Number));
            expect(response.body).toHaveProperty('message', expect.any(String));
        });
    });
});