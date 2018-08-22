const firstNameSignUp = document.getElementById("firstNameSignUp");
const lastNameSignUp = document.getElementById("lastNameSignUp");
const emailSignup = document.getElementById("emailSignup");
const passwordsignUp = document.getElementById("passwordsignUp");
const confirmPasswordsignUp = document.getElementById("confirmPasswordsignUp");
const ageSignUp = document.getElementById("ageSignUp");
const emailErr = document.getElementById("emailErr");
const confirmErr = document.getElementById("confirmErr");
const passwordErr = document.getElementById("passwordErr");
const signUpButton = document.getElementById("signUpButton");
const ageErr = document.getElementById("ageErr");

const checkEmail = () => {
  if (emailSignup.validity.typeMismatch) {
    displayErr(emailErr, "Please enter a valid email address");
  } else if (emailSignup.validity.valueMissing) {
    displayErr(emailErr, "Please enter an email address");
  } else {
    displayErr(emailErr, "");
    return true;
  }
};
const checkAge = () => {
  if (!ageSignUp.checkValidity()) {
    displayErr(ageErr, "Please enter a valid Age , 10-80 Years ");
  } else {
    displayErr(ageErr, "");

    return true;
  }
};

const checkPw = () => {
  if (passwordsignUp.validity.patternMismatch) {
    displayErr(
      passwordErr,
      "Password must contain at least eight characters, including one letter and one number"
    );
  } else if (passwordsignUp.validity.valueMissing) {
    displayErr(passwordErr, "Please enter a password");
  } else {
    displayErr(passwordErr, "");
    return true;
  }
};

const checkConfirmPw = () => {
  if (passwordsignUp.value != confirmPasswordsignUp.value) {
    displayErr(confirmErr, "Passwords do not match");
  } else if (confirmPasswordsignUp.validity.valueMissing) {
    displayErr(confirmErr, "Please confirm your password");
  } else {
    displayErr(confirmErr, "");
    return true;
  }
};

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

emailSignup.addEventListener("focusout", checkEmail);
passwordsignUp.addEventListener("focusout", checkPw);
confirmPasswordsignUp.addEventListener("focusout", checkConfirmPw);
ageSignUp.addEventListener("focusout", checkAge);

signUpButton.addEventListener("click", e => {
  if (checkEmail() && checkPw() && checkConfirmPw() && checkAge()) {
    const firstNameSignUpValue = firstNameSignUp.value;
    const lastNameSignUpValue = lastNameSignUp.value;
    const emailSignupValue = emailSignup.value;
    const passwordsignUpValue = passwordsignUp.value;
    const confirmPasswordsignUpValue = confirmPasswordsignUp.value;
    const ageSignUpValue = ageSignUp.value;

    const newUser = {
      firstNameSignUpValue,
      lastNameSignUpValue,
      emailSignupValue,
      passwordsignUpValue,
      confirmPasswordsignUpValue,
      ageSignUpValue
    };
    request("POST", "/addUser", JSON.stringify(newUser), (err, res) => {
      if (err) return swal(err.detail, " ", "error");
      swal(res,"", "success").then(value => {
        console.log(res);
        
        window.location = "/";
      });
    });
  }
});
