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

blacklistService.addEmail = async (email) => {

    try {

        // Database Query
        const insertQuery = `INSERT INTO
        blacklist(email)
          VALUES($1)
          returning *`;

        const values = [email];
        const isAlredyAdded = await blacklistService.isBlacklisted(email);

        if (!isAlredyAdded) {
            const { rows } = await dbQuery.query(insertQuery, values);
            const dbResponse = rows[0];
        }

        return true;

    } catch (error) {
        throw `No se pudo agregar el correo al blacklist. Motivo:${error}`;
    }
}

blacklistService.removeEmail = async (email) => {

    try {
        // Database Query
        const deleteQuery = 'DELETE FROM blacklist WHERE email=$1 returning *';
        const values = [email];

        const { rows } = await dbQuery.query(deleteQuery, values);
        const dbResponse = rows[0];

        return true;
    } catch (error) {
        throw `No se pudo agregar el correo al blacklist. Motivo:${error}`;
    }
}

// Export
module.exports = blacklistService;