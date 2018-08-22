const tape = require('tape');
const dbBuild = require('../src/database/dbBuild');
const addUser = require('../src/database/queries/insertData');


tape('Testing adding new user', (t) => {
  dbBuild((error, result) => {
    addUser(
      {
        firstName: 'Ibraheem',
        lastName: 'Ali',
        email: 'ibraheem@gmail.com',
        age: '27',
      },
      (err, res) => {
        t.error(err, 'Student Added Successfully');
        t.equal(res.rowCount, 1, 'it should be one Record ! ');
        t.end();
      },
    );
  });
});
