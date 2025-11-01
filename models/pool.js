const { Pool } = require("pg");
const process = require("node:process");
const dotenv = require("dotenv");

dotenv.config();

const { PGURL } = process.env;

module.exports = new Pool({
    connectionString: PGURL
})
