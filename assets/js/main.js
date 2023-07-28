// all inputs
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

//Signup warnings
var userNameWarn = document.getElementById("userNameWarn");
var userEmailWarn = document.getElementById("userEmailWarn");
var userPasswordWarn = document.getElementById("userPasswordWarn");

var requirementListName = document.querySelectorAll(
  ".requirement-list-name li"
);
var requirementListEmail = document.querySelectorAll(
  ".requirement-list-email li"
);
var requirementListPassword = document.querySelectorAll(
  ".requirement-list-password li"
);

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
var validateName,
  validateEmail,
  validatePassword = false;

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
  debugger;
  if (!isEmpty()) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }
  if (!validateName || !validateEmail || !validatePassword) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Please Make Sure all inputs meets requirements</span>';
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
var mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{3,}$/;

const nameRequirements = [
  { regex: /.{3,}/, index: 0 },
  { regex: /^[A-Z]\w*$/, index: 1 },
];

const mailRequirements = [
  {
    // Stage 1: At least 3 characters
    regex: /.{3,}/,
    index: 0,
  },
  {
    // Stage 2: Valid email format
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    index: 1,
  },
];

const passwordRequirements = [
  { regex: /.{3,}/, index: 0 },
  {
    regex: /^(?=.*\d).+$/,
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

if (signupName) {
  signupName.addEventListener("keyup", (e) => {
    let isValid = true;
    debugger;
    nameRequirements.forEach((item) => {
      const isRequirementMet = item.regex.test(e.target.value);
      const requirementItem = requirementListName[item.index];
      debugger;
      if (isRequirementMet) {
        requirementItem.classList.add("valid");
        requirementItem.firstElementChild.className = "fa-solid fa-check";
      } else {
        requirementItem.classList.remove("valid");
        requirementItem.firstElementChild.className = "fa-solid fa-circle";
        isValid = false;
        validateName = false;
      }
    });
    debugger;
    if (isValid) {
      userNameWarn.classList.add("d-none");
      validate(signupName, nameRegex);
      validateName = true;
    } else {
      userNameWarn.classList.remove("d-none");
      validate(signupName, nameRegex);
    }
  });
}

if (signupEmail) {
  signupEmail.addEventListener("keyup", (e) => {
    let isValid = true;
    debugger;
    mailRequirements.forEach((item) => {
      const isRequirementMet = item.regex.test(e.target.value);
      const requirementItem = requirementListEmail[item.index];
      debugger;
      if (isRequirementMet) {
        requirementItem.classList.add("valid");
        requirementItem.firstElementChild.className = "fa-solid fa-check";
      } else {
        requirementItem.classList.remove("valid");
        requirementItem.firstElementChild.className = "fa-solid fa-circle";
        isValid = false;
        validateEmail = false;
      }
    });
    debugger;
    if (isValid) {
      userEmailWarn.classList.add("d-none");
      validate(signupEmail, mailRegex);
      validateEmail = true;
    } else {
      userEmailWarn.classList.remove("d-none");
      validate(signupEmail, mailRegex);
    }
  });
}

if (signupPassword) {
  signupPassword.addEventListener("keyup", (e) => {
    let isValid = true;
    debugger;
    passwordRequirements.forEach((item) => {
      const isRequirementMet = item.regex.test(e.target.value);
      const requirementItem = requirementListPassword[item.index];
      debugger;
      if (isRequirementMet) {
        requirementItem.classList.add("valid");
        requirementItem.firstElementChild.className = "fa-solid fa-check";
      } else {
        requirementItem.classList.remove("valid");
        requirementItem.firstElementChild.className = "fa-solid fa-circle";
        isValid = false;
        validatePassword = false;
      }
    });
    debugger;
    if (isValid) {
      userPasswordWarn.classList.add("d-none");
      validate(signupPassword, passwordRegex);
      validatePassword = true;
    } else {
      userPasswordWarn.classList.remove("d-none");
      validate(signupPassword, passwordRegex);
    }
  });
}

// ============= for Disable Right Click ================
// document.addEventListener("contextmenu", (event) =>
//   event.preventDefault(alert("sorry you can`t check my code"))
// );

// document.onkeydown = function (e) {
//   // disable F12 key
//   if (e.keyCode == 123) {
//     alert("sorry you can`t check my code");
//     return false;
//   }

//   // disable I key
//   if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
//     return false;
//   }

//   // disable J key
//   if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
//     return false;
//   }

//   // disable U key
//   if (e.ctrlKey && e.keyCode == 85) {
//     return false;
//   }
// };
