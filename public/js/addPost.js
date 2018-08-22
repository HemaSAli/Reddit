const sendPost = document.getElementById("sendPost");

const postText = document.getElementById("postText");

sendPost.addEventListener("click",e=>{
const postData = {
    Text : postText.value

}
request("POST","/addPost",JSON.stringify(postData),(err,res)=>{

    if (err) return swal(err,"","error");
    
    return swal(res,"","success").then(value=>{
        window.location="/";
    })
})

})
