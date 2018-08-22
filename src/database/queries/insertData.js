const dbConnection = require("../dbConnection");

const addUserQuery = (firstName, lastName, email, password, age, callback) => {
  const sql = {
    text:
      "INSERT INTO users (firstName, lastName, email,password, age) VALUES ($1,$2,$3,$4,$5)",
    values: [firstName, lastName, email, password, age]
  };

  dbConnection.query(sql, (err, res) => {
    if (err) return callback(err);
    return callback(null, res.rowCount);
  });
};

const addPostQuery = (userID, postText, postDate, cb) => {
  const sql = {
    text: "INSERT INTO posts (userID, postText, postDate) VALUES ($1,$2,$3)",
    values: [userID, postText, postDate]
  };

  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);

    return cb(null, res);
  });
};

const votePostQuery = (userID, value, postId, cb) => {
  const sqlIfVoted = {
    text: "SELECT * FROM posts_vote WHERE userid = $1 AND postid =$2",
    values: [userID, postId]
  };

  const sql = {
    text: "INSERT INTO posts_vote (userid, value, postid) VALUES ($1,$2,$3)",
    values: [userID, value, postId]
  };

  const sqlUnVote = {
    text: "DELETE FROM posts_vote WHERE userid = $1 AND postid =$2",
    values: [userID, postId]
  };

  const sqlOpposite = {
    text:
      "SELECT * FROM posts_vote WHERE userid = $1 AND postid =$2 AND value != $3",
    values: [userID, postId, value]
  };

  dbConnection.query(sqlIfVoted, (err, res) => {
    if (err) return cb(err);
    if (res.rowCount > 0)
      return dbConnection.query(sqlOpposite, (err, res) => {
        if (err) return cb(err);
        if (res.rowCount > 0)
          return dbConnection.query(sqlUnVote, (err, res) => {
            if (err) return cb(err);
            dbConnection.query(sql, (err, res) => {
              if (err) return cb(err);
              return cb(null, res);
            });
          });
        dbConnection.query(sqlUnVote, (err, res) => {
          if (err) return cb(err);
          cb(null, res);
        });
      });
    dbConnection.query(sql, (err, res) => {
      if (err) return cb(err);
      return cb(null, res);
    });
  });
};

const  addReplyQuery = (userID,commentText, postID, parentId,date, cb)=>{

const sql = {
  text:"INSERT INTO comments (userid,commentText,postid,parent_id,commentdate) VALUES ($1,$2,$3,$4,$5)",
  values:[userID,commentText,postID,parentId,date],
}


dbConnection.query(sql,(err,res)=>{
  
  if(err) return cb(err);
  return cb(null,res.rowCount)

})

}
const addCommentQuery = (userID, postID, commentText, commentDate, cb) => {
  const sql = {
    text:
      "INSERT INTO comments (userID, postID, commentText, commentDate) VALUES ($1,$2,$3,$4)",
    values: [userID, postID, commentText, commentDate]
  };
  

  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    return cb(null,res);
  });
};



const commentVote = (userID, commentID, value, cb) => {
  const sql = {
    text:
      "INSERT INTO comments_vote (userID, commentID, value) VALUES ($1,$2,$3)",
    values: (userID, commentID, value)
  };

  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    return cb(res);
  });
};

module.exports = {
  addUserQuery,
  addPostQuery,
  addCommentQuery,
  commentVote,
  votePostQuery,
  addReplyQuery
};
