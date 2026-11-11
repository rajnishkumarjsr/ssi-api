// const mysql = require("mysql2/promise");
import express from 'express';
import mysql from 'mysql2/promise';

// import ('dotenv').config;
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

    // host: process.env.LOCAL_DB_HOST,
    // user: process.env.LOCAL_DB_USER,
    // password: process.env.LOCAL_DB_PASSWORD,
    // database: process.env.LOCAL_DB_NAME,
    // port: process.env.LOCAL_DB_PORT,
    
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

// module.exports = pool;
export default pool;