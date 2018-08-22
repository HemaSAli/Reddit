const dbConnection = require("../dbConnection");

const getPostsQuery = callback => {
  const sql = {
    text:
      "select * from users join posts on posts.userid = users.id  ORDER BY posts.id desc"
  };

  dbConnection.query(sql, (err, res) => {
    if (err) return callback(err);

    return callback(null, res);
  });
};

const getCommentsQuery = (postId, cb) => {
  const sql = {
    text:
      "select posts.posttext,posts.id AS postID,comments.commenttext,comments.commentdate,comments.id AS id , comments.commentdate ,concat(users.firstname,' ',users.lastname) AS name from posts join comments on comments.postid = posts.id join users ON users.id = comments.userid  where posts.id =$1 AND comments.parent_id IS NULL ORDER BY posts.id desc",
    values: [postId]
  };
  dbConnection.query(sql,(err,res)=>{

    if (err) return cb(err);
    return cb(null, res.rows);

  })
};
const getRepliesQuery = (commentID,cb)=>{

  const sql={

    text:"SELECT comments.id , comments.userid ,comments.commentdate, comments.postid , comments.commenttext,concat(users.firstname,' ',users.lastname) AS name  FROM comments join users ON users.id = comments.userid WHERE parent_id =$1 ORDER BY comments.postid desc",
    values:[commentID],
  }
  dbConnection.query(sql,(err,res)=>{
    
    if (err) return cb(err);
    return cb(null, res.rows);

  })
}

const getStatisticsQuery = (postID, callback) => {
  const likesSQL = {
    text:
      "select * from posts join posts_vote ON posts_vote.postid = posts.id where posts_vote.value = '1' AND posts.id = $1",
    values: [postID]
  };
  const DisLikesSQL = {
    text:
      "select * from posts join posts_vote ON posts_vote.postid = posts.id where posts_vote.value = '0' AND posts.id = $1",
    values: [postID]
  };
  const commentsSQL = {
    text:
      "  select * from posts join comments on comments.postid = posts.id  where posts.id = $1",
    values: [postID]
  };

  dbConnection.query(likesSQL, (err, likes) => {
    if (err) return callback(err);
    dbConnection.query(DisLikesSQL, (err, disLikes) => {
      if (err) return callback(err);
      dbConnection.query(commentsSQL, (err, comments) => {
        if (err) return callback(err);
        return callback(null, {
          likes: likes.rowCount,
          disLikes: disLikes.rowCount,
          comments: comments.rowCount
        });
      });
    });
  });
};


const likedAndDislikedQuery = (userId, postId, cb) => {
  const sql = {
    text:
      "SELECT posts_vote.value FROM users JOIN posts_vote ON posts_vote.userid = users.id WHERE posts_vote.userid= $1 AND posts_vote.postid = $2",
    values: [userId, postId]
  };

  dbConnection.query(sql, (err, res) => {
    if (err) return cb(err);
    cb(null, res.rows);
  });
};

module.exports = { getPostsQuery, getCommentsQuery ,getRepliesQuery,getStatisticsQuery,likedAndDislikedQuery};
