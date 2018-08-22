const { Pool } = require('pg');
require('env2')('./config.env');

let { DB_URL } = process.env;
if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.DB_Test_URL;
}
if (!DB_URL) throw new TypeError('Error in DB_URL !');

const options = {
  connectionString: DB_URL,
  ssl: true,
};

module.exports = Pool(options);
