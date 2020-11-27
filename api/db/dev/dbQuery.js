// Imports
const pool = require('./pool');
const dbQuery = {};


dbQuery.query = (quertText, params) => {
  return new Promise((resolve, reject) => {
    pool.query(quertText, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Export
module.exports = dbQuery;
