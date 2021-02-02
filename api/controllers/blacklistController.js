'use strict';

const blacklistService = require('../services/blacklistService');

exports.addBlacklist = async (req, res) => {
    try {
        // TODO: Add validation
        const { email } = req.body;
        const isAdded = await blacklistService.addEmail(email);
        return res.json({ succes: isAdded, message: "Email agregado a la lista negra." });
    } catch (error) {
        return res.json({ success: false, message: 'Ocurrió una excepción. ' + error });
    }
}

exports.removeBlacklist = async (req, res) => {
    try {
        // TODO: Add validation
        const { email } = req.body;
        const isDeleted = await blacklistService.removeEmail(email);
        return res.json({ succes: isDeleted, message: "Email removido de la lista negra." });
    } catch (error) {
        return res.json({ success: false, message: 'Ocurrió una excepción. ' + error });
    }
}

exports.addBlacklistRuc = async (req, res) => {
    try {        
        const { ruc, razonSocial } = req.body;
        const isAdded = await blacklistService.addRuc(ruc, razonSocial);
        return res.json({ succes: isAdded, message: "RUC agregado a la lista negra." });
    } catch (error) {
        return res.json({ success: false, message: 'Ocurrió una excepción. ' + error });
    }
}

exports.removeBlacklistRuc = async (req, res) => {
    try {
        const { ruc } = req.body;
        const isDeleted = await blacklistService.removeRuc(ruc);
        return res.json({ succes: isDeleted, message: "RUC removido de la lista negra." });
    } catch (error) {
        return res.json({ success: false, message: 'Ocurrió una excepción. ' + error });
    }
}