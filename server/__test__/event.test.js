const request = require('supertest');
const app = require('../app.js');
const { hashPassword } = require('../helpers/bcryptjs.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let customer_token = "";

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
        ]
    )
})

afterAll(() => {
    return queryInterface.bulkDelete("Users", null, { truncate: true, cascade: true, restartIdentity: true })
        .then(() => {
            return queryInterface.bulkDelete("Games", null, { truncate: true, cascade: true, restartIdentity: true })
        })
        .then(() => {
            return queryInterface.bulkDelete("Locations", null, { truncate: true, cascade: true, restartIdentity: true })
        })
        .then(() => {
            return queryInterface.bulkDelete("Events", null, { truncate: true, cascade: true, restartIdentity: true })
        });
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


describe('GET all event',()=>{
    beforeAll(()=>{
        return queryInterface.bulkInsert("Games",
        [
            {
                name: "League of Legends: Wild Rift",
                gameImg: "https://www.riotgames.com/darkroom/1440/08bcc251757a1f64e30e0d7e8c513d35:be16374e056f8268996ef96555c7a113/wr-cb1-announcementarticle-banner-1920x1080.png",
                youtubeUrl: "https://www.youtube.com/watch?v=TFzkbos0oeo",
                gameUrl: "https://wildrift.leagueoflegends.com/en-gb/",
                releaseDate: "2020-10-27",
                developer: "RIOT GAMES",
                genre: "MOBA",
                createdAt: new Date(),
                updatedAt: new Date()
              }
        ]
        )   
        .then(()=>{
            return queryInterface.bulkInsert("Locations",
            [
                {
                    name: "Jl. Jakarta",
                    ProvinceId: 31,
                    RegencyId: 3171,
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }
            ]
            )   
        })
        .then(()=>{
            return queryInterface.bulkInsert("Events",
               [
                   {
                       name: "League of Legends: Wild Rift - Esport",
                       description: "Thank you to all the teams who competed during the season one global championship! We also want to give a huge shout out to all the fans who tuned in during Icons and made this event unforgettable. While this season has wrapped up, stay tuned for more Wild Rift esports announcements coming soon!",
                       price: 120000,
                       rules: "Memasuki season pertama esports Wild Rift, peraturan dan kebijakan kompetisi dibuat untuk melindungi integritas kompetitif dan memastikan ekosistem yang sehat bagi tim, pemain, serta penyelenggara turnamen. Kebijakan dan aturan kompetitif global lengkap dapat ditemukan di sini. - https://www.dropbox.com/sh/z509gfeyo5vnjet/AABPuvrFcgXX5MdQC5DSU1jaa?dl=0",
                       eventStatus: "Active",
                       eventPoster: "https://th.bing.com/th/id/OIP.C_o9I8YHGohNXfbsCcS7rQHaEK?pid=ImgDet&rs=1",
                       eventDate: "2022-09-21",
                       eventType: "Offline",
                       UserId: 1,
                       GameId: 1,
                       LocationId: 1,
                       createdAt: new Date(),
                       updatedAt: new Date()
                     }
               ]
               )   
        })
           
    })

    describe('success fetch',()=>{
        it('should return array', async ()=>{
            const response= await request(app).get('/events')
            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body[0]).toHaveProperty('id', expect.any(Number))
            expect(response.body[0]).toHaveProperty('name', expect.any(String))
            expect(response.body[0]).toHaveProperty('description', expect.any(String))
        })
    })
})

describe('GET event by id',()=>{
    describe('success get event by id',()=>{
        it('should be an object', async ()=>{
            const response= await request(app)
            .get('/events/1')

            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
            expect(response.body).toHaveProperty('name', expect.any(String))
            expect(response.body).toHaveProperty('description', expect.any(String))
        })
    })

    describe('Fail get event by id', ()=>{
        it('should return Event not found', async()=>{
            const response= await request(app)
            .get('/events/10')

            expect(response.status).toBe(404)
            expect(response.body).toHaveProperty('code', expect.any(Number))
            expect(response.body).toHaveProperty('message', expect.any(String))
        })
    })
})


describe('CREATE event',()=>{
    describe('success create event',()=>{
        it('should be object',async()=>{
            const body= {eventName: "MLBB",
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
                }
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('id', expect.any(Number));
        })
    })

    describe('fail create event - no name',()=>{
        it('should return error',async()=>{
            const body= { eventName: "",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe('fail create event - no description',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe('fail create event - no price',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })
    describe('fail create event - no rules',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })


    describe('fail create event - no poster',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe('fail create event - no date',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe('fail create event - no type',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe('fail create event - no GameId',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe('fail create event - no locationName',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })


    describe('fail create event - no ProvinceId',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe('fail create event - no RegencyId',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: ""}
            const response= await request(app)
            .post('/events/add')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe('fail create event - no token',()=>{
        it('should return error',async()=>{
            const body= { eventName: "MLBB",
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
                RegencyId: 123}
            const response= await request(app)
            .post('/events/add')
            .send(body)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })
})

describe("PUT Event", ()=>{
    describe("success edit event",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "MLBB",
                price: 2000,
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "MLBB",
                eventDate: "2022-09-08",
                eventType: "online",
                locationName: "Afrika",
                ProvinceId: 123,
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })

    describe("fail edit event - no eventName ",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "",
                description: "MLBB",
                price: 2000,
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "MLBB",
                eventDate: "2022-09-08",
                eventType: "online",
                locationName: "Afrika",
                ProvinceId: 123,
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe("fail edit event - no description ",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "",
                price: 2000,
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "MLBB",
                eventDate: "2022-09-08",
                eventType: "online",
                locationName: "Afrika",
                ProvinceId: 123,
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe("fail edit event - no price ",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "MLBB",
                price: "",
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "MLBB",
                eventDate: "2022-09-08",
                eventType: "online",
                locationName: "Afrika",
                ProvinceId: 123,
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe("fail edit event - no rules",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "MLBB",
                price: 2000,
                rules: "",
                eventStatus: "Pending",
                eventPoster: "MLBB",
                eventDate: "2022-09-08",
                eventType: "online",
                locationName: "Afrika",
                ProvinceId: 123,
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe("fail edit event - no eventPoster",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "MLBB",
                price: 2000,
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "",
                eventDate: "2022-09-08",
                eventType: "online",
                locationName: "Afrika",
                ProvinceId: 123,
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe("fail edit event - no eventDate",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "MLBB",
                price: 2000,
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "123",
                eventDate: "",
                eventType: "online",
                locationName: "Afrika",
                ProvinceId: 123,
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })
    describe("fail edit event - no eventType",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "MLBB",
                price: 2000,
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "123",
                eventDate: "2022-09-08",
                eventType: "",
                locationName: "Afrika",
                ProvinceId: 123,
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })
    describe("fail edit event - no locationName",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "MLBB",
                price: 2000,
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "123",
                eventDate: "2022-09-08",
                eventType: "online",
                locationName: "",
                ProvinceId: 123,
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })
    describe("fail edit event - no ProvinceId",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "MLBB",
                price: 2000,
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "123",
                eventDate: "2022-09-08",
                eventType: "online",
                locationName: "Afrika",
                ProvinceId: "",
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe("fail edit event - no RegencyId",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "MLBB",
                price: 2000,
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "123",
                eventDate: "2022-09-08",
                eventType: "online",
                locationName: "Afrika",
                ProvinceId: 123,
                RegencyId: ""}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            .set('access_token', customer_token)

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(Array));
        })
    })

    describe("fail edit event - no token",()=>{
        it("should be an object",async ()=>{
            const body= { eventName: "MLBB",
                description: "MLBB",
                price: 2000,
                rules: "test",
                eventStatus: "Pending",
                eventPoster: "123",
                eventDate: "2022-09-08",
                eventType: "online",
                locationName: "Afrika",
                ProvinceId: 123,
                RegencyId: 123}
            const response= await request(app)
            .put('/events/1')
            .send(body)
            

            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty('message', expect.any(String));
        })
    })
})



