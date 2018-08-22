const fs = require("fs");
const path = require("path");
const {
  getPostsQuery,
  getCommentsQuery,
  getRepliesQuery,
  getUserPostsQuery,
  getStatisticsQuery,
  likedAndDislikedQuery
} = require("../database/queries/getData");
const getPosts = response => {
  getPostsQuery((err, res) => {
    if (err) return response.end(JSON.stringify({ err }));

    response.end(JSON.stringify({ err: null, result: res.rows }));
  });
};

const getStatistics = (request, response) => {
  let postId = "";
  request.on("data", chunk => {
    postId += chunk;
  });
  request.on("end", () => {
    getStatisticsQuery(postId, (err, res) => {
      if (err) return response.end(JSON.stringify({ err }));
      return response.end(JSON.stringify({ err: null, result: res }));
    });
  });
};

const likedAndDisliked = (request, response, token) => {
  let postId = "";
  request.on("data", chunk => {
    postId += chunk;
  });
  request.on("end", () => {
    likedAndDislikedQuery(token.id, postId, (err, res) => {
      if (err) return response.end(JSON.stringify({ err }));
      return response.end(JSON.stringify({ err: null, result: res }));
    });
  });
};
const getComments = (request, response) => {
  const { url } = request;
  const postId = url.split("=")[1];

  getCommentsQuery(postId, (err, res) => {
    if (err) return response.end(JSON.stringify({ err }));
    return response.end(JSON.stringify({ err: null, result: res }));
  });
};
const getReplies = (request, response) => {
  const { url } = request;

  const commentID = url.split("=")[1];

  getRepliesQuery(commentID, (err, res) => {
    if (err) return response.end(JSON.stringify({ err }));
    return response.end(JSON.stringify({ err: null, result: res }));
  });
};
const viewProfile = (response)=>{
  fs.readFile(path.join(__dirname, '..', '..', 'public', 'profile.html'), (err, file) => {
    if (err)
    response.end(JSON.stringify({ err }));
        else {
        response.writeHead(200, { "content-type": "text/html" });
        response.end(file);
    }
}); 
}

const getUserPosts=(request,response)=>{

  const URL = request.url;

const splitArray = URL.split("/")
const lastElementIndex = splitArray.length-1
const userId= splitArray[lastElementIndex]
getUserPostsQuery(userId,(err,res)=>{
  if (err) return response.end(JSON.stringify({ err }));
  return response.end(JSON.stringify({ err: null, result: res }));

})

}

module.exports = {
  getPosts,
  getStatistics,
  likedAndDisliked,
  getComments,
  getReplies,
  viewProfile,
  getUserPosts
  
};
