const { dbCheckEmail } = require("../database/queries/dbCheckEmail");
const bcrypt = require("bcryptjs");
const { createCookie } = require("../cookieAndAuth");

const login = (request, response) => {
  let userDate = "";
  request.on("data", chunk => {
    userDate += chunk;
  });
  request.on("end", () => {
    userDate = JSON.parse(userDate);    
    if (
      userDate.email.trim().length === 0 ||
      userDate.password.trim().length === 0
    )
      return response.end(
        JSON.stringify({ err: "Enter Valid Email/Password !" })
      );
    dbCheckEmail(userDate.email, (err, dbResult) => {        
      if (err) return response.end(JSON.stringify({ err }));
      if (!dbResult[0])
        return response.end(JSON.stringify({ err: "Email Not Found !" }));
      bcrypt.compare(userDate.password, dbResult[0].password, (err, res) => {
        if (err) return response.end(JSON.stringify({ err }));
        if (res === false)
          return response.end(JSON.stringify({ err: "Wrong Password !" }));
        const userId = dbResult[0].id;
        const name = dbResult[0].firstname

        createCookie(name,userId, (err, token) => {
          if (err) return response.end(JSON.stringify({ err }));          
          response.writeHead(
            200,
            {"Set-Cookie":
            `data=${token};httpOnly;Max-Age=90000000`}
          );
          response.end(JSON.stringify({ err: null, result: "You Are logged in" }));
        });
      });
    });
  });
};

module.exports = { login }