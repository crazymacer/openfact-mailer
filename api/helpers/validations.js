const validations = {};

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
validations.isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
validations.validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
        return false;
    } return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
validations.isEmpty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
    if (input.replace(/\s/g, '').length) {
        return false;
    } return true;
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
validations.empty = (input) => {
    if (input === undefined || input === '') {
        return true;
    }
};

validations.validateCustomEmail = (email) => {

    let isValid = true;

    // Validating smpt configuration
    if (email.config.host != null && email.config.host != "" &&
        email.config.port != null && email.config.port != "" &&
        email.config.secure != null && email.config.secure != "" &&
        email.config.user != null && email.config.user != "" &&
        email.config.password != null && email.config.password != ""
    ) {
        //
    } else {
        console.log("Verifique los parámetros de la configuración del smtp.");
        isValid = false;
    }

    // Validating email data
    if (email.data.senderName != null && email.data.senderName != "" &&
        email.data.recipients != null && email.data.recipients != "" &&
        email.data.body != null     && email.data.body != "" &&
        email.data.subject != null && email.data.subject != ""
    ) {
        //
    } else {
        console.log("Verifique los parámetros del cuerpo del correo.");
        isValid = false;
    }

    // Validating recipient email
    if (!validations.isValidEmail(email.data.recipients)) {
        console.log(`El formato del correo electrónico de destino '${email.data.recipients}' no es válido.`);
        isValid = false;
    }

    return isValid;
}

module.exports = validations;