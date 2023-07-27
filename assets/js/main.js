// all inputs
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

var username = localStorage.getItem("sessionUsername");
if (username) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}

var signUpArray = [];

if (localStorage.getItem("users") == null) {
  signUpArray = [];
} else {
  signUpArray = JSON.parse(localStorage.getItem("users"));
}

// ============= for SignUp ================
//for check inputs is empty or not
function isEmpty() {
  if (
    signupName.value == "" ||
    signupEmail.value == "" ||
    signupPassword.value == ""
  ) {
    return false;
  } else {
    return true;
  }
}

function isEmailExist() {
  debugger;
  for (var i = 0; i < signUpArray.length; i++) {
    if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return true;
    }
  }
}

function signUp() {
  if (!isEmpty()) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }

  var signUp = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  debugger;
  if (isEmailExist()) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Email already exists</span>';
  } else {
    signUpArray.push(signUp);
    localStorage.setItem("users", JSON.stringify(signUpArray));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success</span>';
  }
}

// ============= for Login ================
function isLoginEmpty() {
  if (signinPassword.value == "" || signinEmail.value == "") {
    return false;
  } else {
    return true;
  }
}

function login() {
  debugger;
  var baseURL = window.location.origin;
  if (!isLoginEmpty()) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }
  let password = signinPassword.value;
  let email = signinEmail.value;
  for (let i = 0; i < signUpArray.length; i++) {
    if (
      signUpArray[i].email.toLowerCase() == email.toLowerCase() &&
      signUpArray[i].password.toLowerCase() == password.toLowerCase()
    ) {
      localStorage.setItem("sessionUsername", signUpArray[i].name);
      location.replace(baseURL + "/home.html");
      // if (baseURL == "/") {
      //   location.replace(baseURL + "/home.html");
      // } else {
      //   location.replace(baseURL + "/home.html");
      // }
    } else {
      document.getElementById("incorrect").innerHTML =
        '<span class="p-2 text-danger">incorrect email or password</span>';
    }
  }
}

function logout() {
  localStorage.removeItem("sessionUsername");
}
