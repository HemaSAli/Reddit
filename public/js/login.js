const email=document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("loginButton");



loginButton.addEventListener("click",e=>{
    const loginData = {
        email:email.value,
        password:password.value,
    }
    request("POST","/login",JSON.stringify(loginData),(err,res)=>{        

        if(err) return swal(err,"",'error');
        swal("Welcome Back",res, 'success').then(value=>{

            window.location="/";
        })
    })
})