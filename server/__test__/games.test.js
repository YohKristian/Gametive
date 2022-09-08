const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const fs = require("fs");
const { hashPassword } = require('../helpers/bcryptjs')
let access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpZCI6MSwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjYyNjM3NTIyfQ.Q1IsZYmTTH8WCq1I95G5YGt7cB3-qyIlsJ6DR_lA0Ck"

beforeAll(async () => {
    let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    users.forEach(x => {
        x.createdAt = new Date();
        x.updatedAt = new Date();
        x.password = hashPassword(x.password)
    });
    await queryInterface.bulkInsert("Users", users, {});

    let games = JSON.parse(fs.readFileSync("./data/games.json", "utf-8"));
    games.forEach(x => {
        x.createdAt = new Date();
        x.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Games", games, {});
})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true });
    await queryInterface.bulkDelete("Games", null, { truncate: true, cascade: true, restartIdentity: true });
})

//Read games

describe('GET /games', () => {
    describe('GET /games - success test', () => {
        it('should be return an array of games data from database', async () => {

            const response = await request(app).get('/games')
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        })
    })
})


//Read game by id 

describe('GET /games/:gamesId', () => {
    describe('GET /games/:gamesId - success test', () => {
        it('should be return a game data from database', async () => {

            const response = await request(app).get('/games/1')
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        })
    })

    describe('GET /games/:gamesId - error', () => {
        it('should be return an object with message', async () => {

            const response = await request(app).get('/games/a')
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })
})