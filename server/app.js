if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routers/router.js");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

module.exports = app