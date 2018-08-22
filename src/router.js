const handleHomePage = require("./handler/handlHomePage");
const {
  addUser,
  addPost,
  votePost,
  addReply,
  addComment,
  deletePost
} = require("./handler/insertData");
const {
  getPosts,
  likedAndDisliked,
  getStatistics,
  getComments,
  getReplies,
  viewProfile,
  getUserPosts
} = require("./handler/getData");
const { login } = require("./handler/login");
const { authChek } = require("./cookieAndAuth");

const router = (request, response) => {
  authChek(request, (errAuth, token) => {
    const { url } = request;
    const { method } = request;

    if (url === "/" && method === "GET") {
      handleHomePage("home", request, response);
    } else if (url.match("public") && method === "GET") {
      handleHomePage("static", request, response);
    } else if (url === "/addUser" && method == "POST") {
      if (errAuth) {
        addUser(request, response);
      } else {
        response.writeHead(302, { location: "/" });
        response.end();
      }
    } else if (url === "/login" && method === "POST") {
      if (errAuth) {
        login(request, response);
      } else {
        response.writeHead(302, { location: "/" });
        response.end();
      }
    } else if (url === "/getPosts" && method === "GET") {
      getPosts(response);
    } else if (url === "/checkAuth" && method === "GET") {
      if (errAuth)
        return response.end(JSON.stringify({ err: "You Are Not Logged in !" }));
      return response.end(JSON.stringify({ err: null, result: token }));
    } else if (url === "/signout" && method === "GET") {
      response.writeHead(200, { "Set-Cookie": "data=0;httpOnly;Max-Age=0" });
      response.end(
        JSON.stringify({ err: null, result: "Logged out , See you later " })
      );
    } else if (url === "/getStatistics" && method === "POST") {
      getStatistics(request, response);
    } else if (url === "/addPost" && method === "POST") {
      if (errAuth) {
        response.writeHead(302, { location: "/" });
        response.end();
      } else {
        addPost(request, response, token);
      }
    } else if (url === "/votePost" && method === "POST") {
      if (errAuth) {
        response.writeHead(302, { location: "/" });
        response.end();
      } else {
        votePost(request, response, token);
      }
    } else if (url === "/likedAndDisliked" && method === "POST") {
      if (errAuth) {
        response.writeHead(302, { location: "/" });
        response.end();
      } else {
        likedAndDisliked(request, response, token);
      }
    } else if (url.match("/getComments") && method === "GET") {
      if (errAuth) {
        response.writeHead(302, { location: "/" });
        response.end();
      } else {
        getComments(request, response);
      }
    } else if (url === "/addReply" && method === "POST") {
      if (errAuth) {
        response.writeHead(302, { location: "/" });
        response.end();
      } else {
        addReply(request, response, token);
      }
    } else if (url.match("/getReplies") && method === "GET") {
      if (errAuth) {
        response.writeHead(302, { location: "/" });
        response.end();
      } else {
        getReplies(request, response);
      }
    } else if (url === "/addComment" && method === "POST") {
      if (errAuth) {
        response.writeHead(302, { location: "/" });
        response.end();
      } else {
        addComment(request, response, token);
      }
    } else if (url.match("/viewProfile") && method === "GET") {
      viewProfile(response);
    } else if (url.match("/getUserPosts") && method === "GET") {
      if (errAuth) {
        response.writeHead(302, { location: "/" });
        response.end();
      } else {
        getUserPosts(request, response);
      }
    } else if (url === "/deletePost" && method === "POST") {
      if (errAuth) {
        response.writeHead(302, { location: "/" });
        response.end();
      } else {
        deletePost(request, response, token);
      }
    } else {
      response.end("404 !");
    }
  });
};

module.exports = router;
