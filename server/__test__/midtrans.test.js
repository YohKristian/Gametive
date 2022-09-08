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

describe('POST Snap Token Midtrans', () => {
    // Reset DB
    afterAll(() => {
        return queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true })
    })

    describe('Success POST Snap Token Midtrans - token customer', () => {
        it('should return array of object of token', async () => {
            const body = { totalCostNeedToPay: 10000 }
            const response = await request(app)
                .post('/midtrans/snap-token')
                .send(body)
                .set('access_token', customer_token)

            expect(response.status).toBe(201);
        });
    });

    describe('Fail POST Snap Token Midtrans - no price', () => {
        it('should return status 500', async () => {
            const body = { totalCostNeedToPay: undefined }
            const response = await request(app)
                .post('/midtrans/snap-token')
                .send(body)
                .set('access_token', customer_token)

            console.log(response.MidtransError);

            expect(response.status).toBe(500);
        });
    });

    describe('Fail POST Snap Token Midtrans - no token', () => {
        it('should return object', async () => {
            const body = { totalCostNeedToPay: 10000 }
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