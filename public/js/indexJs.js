//getPosts//
const mainContent = document.getElementById("postsContent");
const login = document.getElementById("login");
const signupButton = document.getElementById("signup");
const loginAndSignupDiv = document.getElementById("loginAndSignupDiv");
const signoutDiv = document.getElementById("signoutDiv");
const signout = document.getElementById("signout");
const createPost = document.getElementById("createPost");

request("GET", "/checkAuth", null, (errAuth, result) => {
  if (errAuth) {
    loginAndSignupDiv.style.display = "block";
    signoutDiv.style.display = "none";
  } else {
    signoutDiv.style.display = "block";
    loginAndSignupDiv.style.display = "none";
  }

  createPost.addEventListener("click", e => {
    if (errAuth) return showModel("loginModal");
    showModel("CreatePostModel");
  });
  signout.addEventListener("click", e => {
    request("GET", "/signout", null, (err, res) => {
      if (err) return swal(err, "", "error");
      return swal(res, "", "success").then(value => {
        window.location = "/";
      });
    });
  });
  login.addEventListener("click", e => {
    showModel("loginModal");
  });
  signupButton.addEventListener("click", e => {
    showModel("signUpModal");
  });
  const getPosts = () => {
    mainContent.textContent = "";
    request("GET", "/getPosts", null, (err, res) => {
      if (err) return swal(err, "", "error");
      const postsArray = res;
      postsArray.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        const postTextDiv = document.createElement("div");
        const p = document.createElement("p");
        p.setAttribute("id", "postText");
        p.textContent = post.posttext;
        const i = document.createElement("i");
        const timeOfPost = document.createElement("p");
        i.classList.add("fab");
        i.classList.add("fa-creative-commons-by");

        i.textContent = " " + post.firstname + " " + post.lastname;
        timeOfPost.textContent = post.postdate;
        timeOfPost.classList.add("timeOfPost");

        postTextDiv.appendChild(p);
        postTextDiv.appendChild(i);
        postTextDiv.appendChild(timeOfPost);
        postDiv.appendChild(postTextDiv);
        mainContent.appendChild(postDiv);
        i.addEventListener("click", e => {
        swal("Coming Soon , view Profile ..")
        });
        const statisticsDiv = document.createElement("div");
        const likes = document.createElement("i");
        const disLikes = document.createElement("i");
        const comments = document.createElement("i");
        likes.classList.add("fas");
        disLikes.classList.add("fas");
        comments.classList.add("fas");
        likes.classList.add("fa-thumbs-up");
        disLikes.classList.add("fa-thumbs-down");
        comments.classList.add("fa-comment");

        getStatistics(post.id, (err, res) => {
          if (err) return swal(err, "", "error");

          const statistics = res;
          likes.textContent = " " + statistics.likes;
          disLikes.textContent = " " + statistics.disLikes;
          comments.textContent = " " + statistics.comments;
          statisticsDiv.appendChild(likes);
          statisticsDiv.appendChild(disLikes);
          statisticsDiv.appendChild(comments);
          postDiv.appendChild(statisticsDiv);
          likes.addEventListener("click", e => {
            const voteData = {
              value: 1,
              postId: post.id
            };
            if (errAuth) return showModel("loginModal");
            request(
              "POST",
              "/votePost",
              JSON.stringify(voteData),
              (err, res) => {
                if (err) return swal(err, "", "error");

                likes.classList.toggle("checked");
                disLikes.classList.toggle("redChecked");
                getPosts();
              }
            );
          });
          disLikes.addEventListener("click", e => {
            const voteData = {
              value: 0,
              postId: post.id
            };
            if (errAuth) return showModel("loginModal");

            request(
              "POST",
              "/votePost",
              JSON.stringify(voteData),
              (err, res) => {
                if (err) return swal(err, "", "error");
                likes.classList.toggle("checked");

                disLikes.classList.toggle("redChecked");
                getPosts();
              }
            );
          });

          postDiv.addEventListener("click", e => {
            if (e.target !== likes && e.target !== disLikes && e.target !== i) {
              if (errAuth) return showModel("loginModal");
              showPost(post.id);
            }
          });
          if (!errAuth)
            return request("POST", "/likedAndDisliked", post.id, (err, res) => {
              if (res[0]) {
                if (res[0].value == 1) {
                  likes.classList.add("checked");
                } else {
                  disLikes.classList.add("redChecked");
                }
              }
            });
        });
      });
    });
  };
  getPosts();

  const getStatistics = (postId, cb) => {
    request("POST", "/getStatistics", postId, (err, res) => {
      if (err) return cb(err);
      return cb(null, res);
    });
  };
});
