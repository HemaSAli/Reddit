const dbConnection = require('../dbConnection');


const dbCheckEmail = (email,callback) => {
  
  const sql = {
    text: 'select * from users where email = $1',
    values : [email]
  };

  dbConnection.query(sql, (err, res) => {    
    if (err) return callback(err)
    
    return callback(null,res.rows)
     
  });
};

module.exports = { dbCheckEmail }