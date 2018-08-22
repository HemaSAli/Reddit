const bcrypt = require("bcryptjs");
const moment = require("moment");

const {
  addUserQuery,
  addPostQuery,
  votePostQuery,
  addReplyQuery,
  addCommentQuery,
  deletePostQuery
} = require("../database/queries/insertData");

const addUser = (request, response) => {
  let newUser = "";

  request.on("data", chunk => {
    newUser += chunk;
  });

  request.on("end", () => {
    newUser = JSON.parse(newUser);

    const {
      firstNameSignUpValue,
      lastNameSignUpValue,
      emailSignupValue,
      passwordsignUpValue,
      ageSignUpValue
    } = newUser;

    bcrypt.hash(passwordsignUpValue, 10, (err, hash) => {
      addUserQuery(
        firstNameSignUpValue,
        lastNameSignUpValue,
        emailSignupValue,
        hash,
        ageSignUpValue,
        (err, result) => {
          
          if (err) return response.end(JSON.stringify({ err:err }));
          return response.end(
            JSON.stringify({ err: null, result: "Welcome To Our Site ! " })
          );
        }
      );
    });
  });
};

const addPost = (request, response, token) => {
  let newPost = "";

  request.on("data", chunk => {
    newPost += chunk;
  });

  request.on("end", () => {
    newPost = JSON.parse(newPost);

    let date = new Date();
    date = moment(date).format("MMMM Do YYYY, h:mm a");
        if( newPost.Text.trim().length===0)
    return response.end(
      JSON.stringify({ err: "You Cant Add Empty Post ! " })
    );
    addPostQuery(token.id, newPost.Text, date, (err, res) => {
      if (err) return response.end(JSON.stringify({ err }));
      return response.end(JSON.stringify({ err: null, result: "Post added " }));
    });
  });
};
const votePost = (request, response, token) => {
  let likeData = "";
  request.on("data", chunk => {
    likeData += chunk;
  });
  request.on("end", () => {
    likeData = JSON.parse(likeData);

    votePostQuery(token.id, likeData.value, likeData.postId, (err, res) => {
      if (err) return response.end(JSON.stringify({ err }));
      return response.end(JSON.stringify({ err: null, result: res }));
    });
  });
};
const addReply = (request, response, token) => {
  let replyData = "";
  request.on("data", chunk => {
    replyData += chunk;
  });
  request.on("end", () => {
    replyData = JSON.parse(replyData);
    const replyText = replyData.replyText;
    const replyPostId = replyData.postId;
    const replyCommentId = replyData.commentid;

    let date = new Date();
    date = moment(date).format("MMMM Do YYYY, h:mm a");

    if (replyText.trim().length === 0)
      return response.end(JSON.stringify({ err: "You Cant Add Empty Post" }));

    addReplyQuery(
      token.id,
      replyText,
      replyPostId,
      replyCommentId,
      date,
      (err, res) => {
        if (err) return response.end(JSON.stringify({ err }));

        return response.end(JSON.stringify({ err: null, result: res }));
      }
    );
  });
};
const addComment = (request, response, token) => {
  let commentData = "";
  request.on("data", chunk => {
    commentData += chunk;
  });
  request.on("end", () => {
    commentData = JSON.parse(commentData);

    const commentText = commentData.commentText;
    const commentPostId = commentData.postId;
    if (commentText.trim().length === 0)
      return response.end(
        JSON.stringify({ err: "You Cant Add Empty Comment ! " })
      );

    let date = new Date();
    date = moment(date).format("MMMM Do YYYY, h:mm a");
    addCommentQuery(token.id, commentPostId, commentText, date, (err, res) => {
      if (err) return response.end(JSON.stringify({ err }));
      return response.end(
        JSON.stringify({ err: null, result: "one Comment Added" })
      );
    });
  });
};
const deletePost = (request, response, token) => {
  let postID = "";
  request.on("data", chunk => {
    postID += chunk;
  });
  request.on("end", () => {
    deletePostQuery(postID, token.id, (err, res) => {
      if (err) return response.end(JSON.stringify({ err }));
      return response.end(
        JSON.stringify({ err: null, result: "One Post Deleted " })
      );
    });
  });
};

module.exports = {
  addUser,
  addPost,
  votePost,
  addReply,
  addComment,
  deletePost
};
