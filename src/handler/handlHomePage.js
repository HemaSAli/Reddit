const fs = require('fs');
const path = require('path');

const handleHomePage = (target, request, response) => {    
  const reqPage = {
    home: 'public/index.html',
    static: request.url,
  };

  fs.readFile(
    path.join(__dirname, '..', '..', reqPage[target]), (err, file) => {
      if (err) return new TypeError('Error in Reading File ! ');
      response.writeHead(200);
      response.end(file);
    });
};

module.exports = handleHomePage;
