const { Pool } = require("pg");
const process = require("node:process");
const dotenv = require("dotenv");

dotenv.config();

module.exports = new Pool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})
