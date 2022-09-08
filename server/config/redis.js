const Redis = require("ioredis");
const redis = new Redis({ port: 18899, host: "redis-18899.c294.ap-northeast-1-2.ec2.cloud.redislabs.com", username: "default", password: "duydeHLZs9IqsQPDwl3UkszCxhbv77CK" }); //REDISLAB
module.exports = { redis };
