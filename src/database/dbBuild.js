const fs = require('fs');
const path = require('path');

const dbConnections = require('./dbConnection');

const sql = fs.readFileSync(path.join(__dirname, 'dbBuild.sql')).toString();

const dbBuild = (cb) => {
  dbConnections.query(sql, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};


module.exports = dbBuild;
