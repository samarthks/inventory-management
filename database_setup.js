require('dotenv').config()
const { Pool } = require('pg');
const { password } = require('pg/lib/defaults');

// const pool = new Pool({
//     host:process.env.DB_HOST,
//     port:process.env.DB_PORT,
//     database:process.env.DB_NAME
// })

const pool = new Pool({
    host:"ec2-3-224-157-224.compute-1.amazonaws.com",
    port:5432,
    user:"mcqfnreeleavrk",
    password:"4d954978247f6ce14129908c70c731f839df832221410fdee37eeebb6a5757ba",
    database:"d13ilgbkiqd06t"
})

module.exports=pool;

