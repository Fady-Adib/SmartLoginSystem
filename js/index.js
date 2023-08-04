//---------------Script load-----------------------------
console.log("Script load successfully");
//---------------sign up element-------------------------
const signNameInput = document.getElementById("signNameInput")
const signEmailInput = document.getElementById("signEmailInput")
const signPassWordInput = document.getElementById("signPassWordInput")
const signValid = document.getElementById("signValid")
const signUpBtn = document.getElementById("signUpBtn")
//---------------log in element---------------------------
const logEmailInput = document.getElementById("logEmailInput")
const logPassWordInput = document.getElementById("logPassWordInput")
const logInValid = document.getElementById("logInValid")
const logInBtn = document.getElementById("logIn")
//---------------home element---------------------------
const logOutBtn = document.getElementById("logOut")
const homeWelcome = document.getElementById("homeWelcome")
//---------------storage data---------------------------
const userListStorage = "userList"
let userList = []
let nameOfFoundedUser = JSON.parse(localStorage.getItem("userLogIn"))
//---------------sign up process---------------------------
//-------get data--------------
if (localStorage.getItem(userListStorage)) {
    userList = JSON.parse(localStorage.getItem(userListStorage))
}



//-------To Add users--------------

try {
    
    signUpBtn.addEventListener("click", AddUser)

} catch (error) {
    

}

function AddUser() {
    if (validationSignUp()) {
        let user = {
            username: signNameInput.value,
            userEmail: signEmailInput.value,
            userPassWord: signPassWordInput.value,
        }
        userList.push(user)
        localStorage.setItem(userListStorage, JSON.stringify(userList))
        console.log(userList);
        setTimeout(location.replace("index.html"), 5000)

    }
}
//-------input required for users(validation)--------------
function validationSignUp() {
    let valid
    if (signNameInput.value &&
        signEmailInput.value &&
        signPassWordInput.value) {
        if (emailValidationSignUp()) {
            if (validationNameSignUp()) {
                valid = true } 

        }
    } else {
        signValid.classList.remove("d-none")
        signValid.innerText = 'All Inputs is Required'
    }
    return valid
}
function validationNameSignUp(){

    let pattern = /^[A-Za-z]{1}[a-z]{2,15}(\s[A-Za-z]{1}[a-z]{2,15}){0,1}$/gm
    let valid = pattern.test(signNameInput.value)
    if (valid) {
        
    } else {
        signValid.classList.replace("text-success", "text-danger")
        signValid.classList.remove("d-none")
        signValid.innerText = 'Min Letter 3-11'
        
    }


    return valid

}
//-------if email exists for (email validation)--------------
function emailValidationSignUp() {
    let valid
    let pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    valid = pattern.test(signEmailInput.value)
    if (valid) {
        let founded = userList.find((user) =>
            user.userEmail.toLowerCase() == signEmailInput.value.toLowerCase())
        console.log(founded);
        if (!founded) {
            valid = true
            signValid.classList.remove("d-none")
            signValid.innerText = 'success'
            signValid.classList.replace("text-danger", "text-success")
        } else {
            valid = false
            signValid.classList.remove("d-none")
            signValid.innerText = 'Email Already Exists'
            signValid.classList.replace("text-success", "text-danger")
        }
        
    } else {
        valid = false
        signValid.classList.remove("d-none")
        signValid.innerText = 'Email Must be (example@gamil.com)'
        signValid.classList.replace("text-success", "text-danger")

    }
    
    console.log(valid);
    return valid
}
// function emailValidationSignUp() {
//     let valid = true
//     // console.log(userList[i].userEmail);
//     // console.log(signEmailInput.value);
//     for (let i = 0; i < userList.length; i++) {
//         if (userList[i].userEmail.toLowerCase() == signEmailInput.value.toLowerCase()) {
//             valid = false
//             console.log(valid, "email");
//             break;
//         } else {
//             valid = true
//             console.log(valid, "email");
//         }
//     }
//     if (valid) {
//         signValid.classList.remove("d-none")
//         signValid.innerText = 'success'
//         signValid.classList.replace("text-danger", "text-success")
//     } else {
//         signValid.classList.remove("d-none")
//         signValid.innerText = 'email already exists'
//         signValid.classList.replace("text-success", "text-danger")
//     }
//     return valid
// }


//---------------Log in process---------------------------
try {
    logInBtn.addEventListener("click", logInFun)
} catch (error) {
   
}
function logInFun() {
    if (logInValidation()) {
        setTimeout(location.replace("home.html"), 5000)

    }

}



//-------required data-----------------
function logInValidation() {
    let valid

    if (logEmailInput.value && logPassWordInput.value) {
        if (logInValidationEmailPassword()) {
            valid = true
        } 

    }
    else {
        valid = false
        logInValid.classList.remove("d-none")
        logInValid.innerText = 'All Inputs is Required'
    }
    return valid
}

//--------validation of email & password------------
function logInValidationEmailPassword() {
    let valid
    let pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    valid = pattern.test(logEmailInput.value)
    if (valid) {
        let foundedEmail = userList.find(user => user.userEmail == logEmailInput.value)
        if (foundedEmail) {
            let foundedEmilPassWord = foundedEmail.userPassWord
            if (foundedEmilPassWord == logPassWordInput.value) {
                valid = true
                nameOfFoundedUser = localStorage.setItem("userLogIn", JSON.stringify(foundedEmail.username))
                console.log(nameOfFoundedUser);
            } else {
                valid = false
                logInValid.classList.remove("d-none")
                logInValid.innerText = 'Incorrect Password'
                logInValid.classList.replace("text-success", "text-danger")
            }
        } else {
            valid = false
            logInValid.classList.remove("d-none")
            logInValid.innerText = 'Incorrect Email or Password'
            logInValid.classList.replace("text-success", "text-danger")
        }
    } else {
        valid = false
        logInValid.classList.remove("d-none")
        logInValid.innerText = 'Email Must be (example@gamil.com)'
        logInValid.classList.replace("text-success", "text-danger")

    }
    

    return valid
}
//---------------home process---------------------------

try {
    homeWelcome.innerText = `Welcome ${nameOfFoundedUser}`
} catch (error) {

}

try {
    logOutBtn.addEventListener("click", function () {
        setTimeout(location.replace("index.html"), 5000)  
    })
} catch (error) {
   
}




