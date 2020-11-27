// Imports
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const databaseConfig = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(databaseConfig);

// Export
module.exports = pool;