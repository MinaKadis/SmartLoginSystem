// all inputs
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

//Clear all inputs
function clearInputs() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
  signupName.classList.remove("is-valid");
  signupEmail.classList.remove("is-valid");
  signupPassword.classList.remove("is-valid");
}

var username = localStorage.getItem("sessionUsername");
if (username) {
  // document.getElementById("username").innerHTML = "Welcome " + username;
  document.getElementById("username").innerHTML = `<div class="glitch-wrapper">
   <div class="glitch" data-glitch="Welcome">Welcome "${username}"</div>
</div>`;
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
  var baseURL = window.location.origin;
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
    setTimeout(function () {
      location.replace(baseURL + "/index.html");
    }, 2000);
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
  const foundUser = signUpArray.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password.toLowerCase() === password.toLowerCase()
  );

  if (foundUser) {
    localStorage.setItem("sessionUsername", foundUser.name);
    location.replace(baseURL + "/home.html");
  } else {
    document.getElementById("incorrect").innerHTML =
      '<span class="p-2 text-danger">Incorrect email or password</span>';
  }
}

function logout() {
  localStorage.removeItem("sessionUsername");
}

// ============= for Validation ================
var nameRegex = /^[A-Z]\w{2,}(\s+\w+)*$/;
var mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var passwordRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nameRequirements = [
  { regex: /.{3,}/, index: 0 },
  { regex: /^[A-Z][a-z]*$/, index: 1 },
];

const mailRequirements = [
  { regex: /.{3,}/, index: 0 },
  {
    regex: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
    index: 1,
  },
];

const passowrdRequirements = [
  { regex: /.{3,}/, index: 0 },
  {
    regex: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
    index: 1,
  },
];

//Validate Function
function validate(element, regex) {
  debugger;
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
