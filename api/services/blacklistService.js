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

blacklistService.isBlacklistedRuc = async (ruc) => {

    try {
        let isBlocked = false;

        // Database Query
        const validateEmailQuery = 'SELECT * from blacklistRuc WHERE ruc = $1';
        const { rows } = await dbQuery.query(validateEmailQuery, [ruc]);
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

blacklistService.addRuc = async (ruc, razonSocial = "") => {

    try {

        // Database Query
        const insertQuery = `INSERT INTO
        blacklistRuc(ruc, razonSocial)
          VALUES($1, $2)
          returning *`;

        const values = [ruc, razonSocial];
        const isAlredyAdded = await blacklistService.isBlacklistedRuc(ruc);

        if (!isAlredyAdded) {
            const { rows } = await dbQuery.query(insertQuery, values);
            const dbResponse = rows[0];
        }

        return true;

    } catch (error) {
        throw `No se pudo agregar el correo al blacklist. Motivo:${error}`;
    }
}

blacklistService.removeRuc = async (ruc) => {

    try {
        // Database Query
        const deleteQuery = 'DELETE FROM blacklistRuc WHERE ruc=$1 returning *';
        const values = [ruc];

        const { rows } = await dbQuery.query(deleteQuery, values);
        const dbResponse = rows[0];

        return true;
    } catch (error) {
        throw `No se pudo agregar el correo al blacklist. Motivo:${error}`;
    }
}

// Export
module.exports = blacklistService;