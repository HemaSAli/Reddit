const showPost = postId => {
  const showPostModal = document.getElementById("showPost");
  showPostModal.textContent = "";
  const addComment = document.createElement("div");
  addComment.setAttribute("id", "addComment");
  const newCommentArea = document.createElement("textarea");
  newCommentArea.classList.add("modalinput");
  newCommentArea.setAttribute("cols", "50");
  newCommentArea.setAttribute("placeholder", "Write a Comment ..");
  sendCommentButton = document.createElement("sendComment");
  sendCommentButton.setAttribute("id", "sendComment");
  sendCommentButton.classList.add("modalButton");
  sendCommentButton.textContent = "Send Comment";
  showPostModal.appendChild(newCommentArea);
  showPostModal.appendChild(sendCommentButton);
  sendCommentButton.addEventListener("click", e => {
      const commentData = {
        commentText: newCommentArea.value,
        postId
      };
      request(
        "POST",
        "/addComment",
        JSON.stringify(commentData),
        (err, res) => {
          if (err) return swal(err, "", "error");
          swal("comment sent !", " ", "success").then(value => {
            showPost(postId);
          });
        }
      );

  });
  request(
    "GET",
    `/getComments?postId=${postId}`,
    null,
    (err, commentsArray) => {
      if (err) return swal(err, "", "error");

      commentsArray.forEach(commentElement => {
        createDiv(commentElement, showPostModal, postId);
      });

      showModel("showPostModal");
    }
  );
};
const getReplies = (commentId, postId, div) => {
  request("GET", `/getReplies?commentId=${commentId}`, null, (err, res) => {
    const repliesArray = res;
    repliesArray.forEach(commentElement => {
      createDiv(commentElement, div, postId);
    });
  });
};

const createDiv = (commentElement, div, postId) => {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("commentDiv");
    const comment = document.createElement("p");
    comment.classList.add("comment");
    comment.textContent = commentElement.commenttext;
    const nameAndDateDiv = document.createElement("div");
    const name = document.createElement("i");
    name.textContent = commentElement.name + " ";
    name.classList.add("commentName");
    nameAndDateDiv.appendChild(name);
    const date = document.createElement("a");
    date.textContent = commentElement.commentdate;
    date.classList.add("commentDate");
    nameAndDateDiv.appendChild(date);
    comment.appendChild(nameAndDateDiv);
    const reply = document.createElement("i");
    reply.classList.add("reply");
    reply.textContent = "Reply";

    const textareaReply = document.createElement("textarea");
    const buttonReply = document.createElement("button");
    buttonReply.classList.add("modalButton");
    buttonReply.textContent = "Send Reply";
    buttonReply.style.display = "none";
    textareaReply.setAttribute("cols", "30");
    textareaReply.classList.add("modalinput", "reply");
    textareaReply.style.display = "none";
    comment.appendChild(reply);
    comment.appendChild(textareaReply);
    comment.appendChild(buttonReply);
    commentDiv.appendChild(comment);
    div.appendChild(commentDiv);
    getReplies(commentElement.id, postId, commentDiv);
    reply.addEventListener("click", e => {
      if (textareaReply.style.display === "none") {
        textareaReply.style.display = "block";
        buttonReply.style.display = "block";
      } else {
        buttonReply.style.display = "none";
        textareaReply.style.display = "none";
      }
    });
    buttonReply.addEventListener("click", e => {
      const replyText = textareaReply.value;
      if (replyText.trim().length !== 0) {
        const replyData = {
          replyText,
          postId: commentElement.postid,
          commentid: commentElement.id
        };

        request("POST", "/addReply", JSON.stringify(replyData), (err, res) => {
          if (err) return swal(err, "", "error");
          swal("Reliy sent !", "", "success").then(value => {
            showPost(postId);
          });
        });
      }
    });

};
