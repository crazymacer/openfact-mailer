// Imports
const dbQuery = require('../db/dev/dbQuery');

// 
const blacklistService = {};

blacklistService.isBlacklisted = async (email) => {

    try {
        let isBlocked = false;

        // Database Query
        const validateEmailQuery = 'SELECT * from blacklist WHERE email = $1';
        const { rows } = await dbQuery.query(validateEmailQuery, [email]);
        const dbResponse = rows[0];

        // Check if Exist
        if (dbResponse) {            
            isBlocked = true;
        }

        return isBlocked;

    } catch (error) {
        throw `No se pudo consultar el servicio de blacklist`;
    }
}

// Export
module.exports = blacklistService;