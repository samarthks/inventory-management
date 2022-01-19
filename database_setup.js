require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
})

module.exports=pool;
