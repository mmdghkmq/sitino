// Success Register //
const successOnRegister = document.querySelector(".register-success");
// const signTitle = document.querySelector(".sign-title");

// Toggle Bar //
const formTitle = document.querySelector(".form-header__title");
const toggleBg = document.querySelector(".form-header__toggle-bg");
const signUpBtn = document.querySelector(".sign-up-btn");
const signInBtn = document.querySelector(".sign-in-btn");
const signUpForm = document.querySelector(".form-sign-up");
const signInForm = document.querySelector(".form-sign-in");

// SignUp Email //
const signUpEmailInput = document.querySelector(".sign-up-email__input");
const signUpEmailError = document.querySelector(".sign-up-email__error-icon");
const signUpEmailValid = document.querySelector(".sign-up-email__valid-icon");
const signUpEmailErrorMessage = document.querySelector(".sign-up-email__error");
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
let isInputOk = null;

// Password //
const signUpPasswordInput = document.querySelector(".sign-up-password__input");
const signUpPasswordError = document.querySelector(".sign-up-password__error-icon")
const signUpPasswordValid = document.querySelector(".sign-up-password__valid-icon")
const signUpPasswordErrorMessage = document.querySelector(".sign-up-password__error");
const signUpHidePassword = document.querySelector(".sign-up-password__hide-icon");
const signUpShowPassword = document.querySelector(".sign-up-password__show-icon");
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
let isPasswordOk = null;

// Password Repeat //
const signUpPasswordRepeatInput = document.querySelector(".sign-up-password-repeat__input");
const signUpPasswordRepeatError = document.querySelector(".sign-up-password-repeat__error-icon")
const signUpPasswordRepeatValid = document.querySelector(".sign-up-password-repeat__valid-icon")
const signUpPasswordRepeatErrorMessage = document.querySelector(".sign-up-password-repeat__error");
const signUpHidePasswordRepeat = document.querySelector(".sign-up-password-repeat__hide-icon");
const signUpShowPasswordRepeat = document.querySelector(".sign-up-password-repeat__show-icon");
let isPasswordRepeatOk = null;

// CheckBox //
const signUpAgreeCheckbox = document.querySelector(".sign-up-agree__input");
let isChecked = null;

// Submit Btn //
const signUpSubmitBtn = document.querySelector(".sign-up-submit");

// ======================================================= Toggle Bg Configuration ===========================================================//
signUpBtn.onclick = ()=>{
    toggleBg.style.right = "0";
    signUpBtn.style.color = "var(--white)";
    signInBtn.style.color = "inherit";
    signUpForm.style.right = "0";
    signInForm.style.right = "50rem";
    formTitle.innerText = "ثبت‌نام در سایت";
};
signInBtn.onclick = ()=>{
    toggleBg.style.right = getComputedStyle(signUpBtn).getPropertyValue("width");
    signInBtn.style.color = "var(--white)";
    signUpBtn.style.color = "inherit";
    signUpForm.style.right = "-50rem";
    signInForm.style.right = "0";
    formTitle.innerText = "ورود به سایت";

};

// ======================================================== Submit Configuration ===========================================================//
function enableSubmitBtn(){
    if(isInputOk && isPasswordOk && isPasswordRepeatOk && isChecked){
        signUpSubmitBtn.disabled = false;
        signUpSubmitBtn.classList.add("sign-up-submit-active");
    }
    else{
        signUpSubmitBtn.disabled = true;
        signUpSubmitBtn.classList.remove("sign-up-submit-active");
    }
}

signUpForm.onsubmit = (e) => {
    e.preventDefault();

    const user = {
        email: signUpEmailInput.value,
        password: signUpPasswordInput.value,
    };
    localStorage.setItem(user.email,user.password);
    const getEmailAddress = localStorage.key("email");
    const getPassword = localStorage.getItem(getEmailAddress);

    setTimeout(()=>{
        successOnRegister.classList.add("register-success--active");
    },1000);

    setTimeout(()=>{
        location.href = "../dashboard.html";
    },3000)
};

// ======================================================== Email Configuration ===========================================================//
let emailValidation = (condition, input, validBtn, invalidBtn, errMessage) => {
    if(condition){
        invalidBtn.style.display = "none";
        validBtn.style.display = "block";
        input.style.border = "1px solid #27ae60";
        isInputOk = true;
    }
    else{
        if(input.value.length === 0){
            invalidBtn.style.display = "none";
            validBtn.style.display = "none";
            input.style.border = "1px solid var(--gray)";
        }
        else{
            validBtn.style.display = "none";
            invalidBtn.style.display = "block";
            input.style.border = "1px solid #e74c3c";
            invalidBtn.onmouseenter = ()=>{
                errMessage.classList.add("sign-up-email__error--show");
            };
            invalidBtn.onclick = ()=>{
                errMessage.classList.add("sign-up-email__error--show");
            };
            invalidBtn.onmouseleave = ()=>{
                errMessage.classList.remove("sign-up-email__error--show");
            };
        }
        isInputOk = false;
    }
    enableSubmitBtn();
};
signUpEmailInput.onkeyup = () => {
    emailValidation(emailRegex.test(signUpEmailInput.value), signUpEmailInput, signUpEmailValid, signUpEmailError, signUpEmailErrorMessage);
};

// ======================================================== Password Configuration ===========================================================//
let passwordValidation = (condition, input, validBtn, invalidBtn, errMessage, showPass, hidePass, inputNumber) => {

    if(inputNumber === 1){
        passwordValidation(signUpPasswordRepeatInput.value ===  signUpPasswordInput.value && !(signUpPasswordRepeatInput.value.length === 0),
        signUpPasswordRepeatInput, signUpPasswordRepeatValid, signUpPasswordRepeatError, signUpPasswordRepeatErrorMessage,signUpHidePasswordRepeat,
        signUpShowPasswordRepeat, 2);
    }

    hidePass.style.fill = "#000";
    showPass.style.fill = "#000";
    if(condition){
        invalidBtn.style.display = "none";
        validBtn.style.display = "block";
        input.style.border = "1px solid #27ae60";
        if(inputNumber === 1){
            isPasswordOk = true;
        }
        if(inputNumber === 2){
            isPasswordRepeatOk = true;
        }
    }
    else{
        if(input.value.length === 0){
            hidePass.style.fill = "#BDC3C7";
            showPass.style.fill = "#BDC3C7";
            validBtn.style.display = "none";
            invalidBtn.style.display = "none";
            input.style.border = "1px solid var(--gray)";
        }
        else{
            validBtn.style.display = "none";
            invalidBtn.style.display = "block";
            input.style.border = "1px solid #e74c3c";
            invalidBtn.onmouseenter = ()=>{
                if(inputNumber === 1){
                    errMessage.classList.add("sign-up-password__error--show");
                }
                if(inputNumber === 2){
                    errMessage.classList.add("sign-up-password-repeat__error--show");
                }
            };
            invalidBtn.onclick = ()=>{
                if(inputNumber === 1){
                    errMessage.classList.add("sign-up-password__error--show");
                }
                if(inputNumber === 2){
                    errMessage.classList.add("sign-up-password-repeat__error--show");
                }
            };
            invalidBtn.onmouseleave = ()=>{
                if(inputNumber === 1){
                    errMessage.classList.remove("sign-up-password__error--show");
                }
                if(inputNumber === 2){
                    errMessage.classList.remove("sign-up-password-repeat__error--show");
                }
            };
        }
        if(inputNumber === 1){
            isPasswordOk = false;
        }
        if(inputNumber === 2){
            isPasswordRepeatOk = false;
        }
    }
    enableSubmitBtn();
}

signUpPasswordInput.onkeyup = () => {
    passwordValidation(passwordRegex.test(signUpPasswordInput.value), signUpPasswordInput, signUpPasswordValid, signUpPasswordError,
    signUpPasswordErrorMessage, signUpHidePassword, signUpShowPassword, 1);
};

signUpPasswordRepeatInput.onkeyup = () =>{
    passwordValidation(signUpPasswordRepeatInput.value ===  signUpPasswordInput.value && !(signUpPasswordRepeatInput.value.length === 0),
    signUpPasswordRepeatInput, signUpPasswordRepeatValid, signUpPasswordRepeatError, signUpPasswordRepeatErrorMessage, signUpHidePasswordRepeat,
    signUpShowPasswordRepeat, 2);
};

// ==================================================== Show/Hide Button Configuration =======================================================//
let showOrHidePassword = (input, hideBtn, showBtn) => {
    if(input.type === "password"){
        input.type = "text";
        hideBtn.style.display = "none";
        showBtn.style.display = "block";
        input.focus();
    }
    else{
        input.type = "password";
        showBtn.style.display = "none";
        hideBtn.style.display = "block";
        input.focus();
    }
}
signUpHidePassword.onclick = () => {
    showOrHidePassword(signUpPasswordInput, signUpHidePassword, signUpShowPassword);
}
signUpShowPassword.onclick = () =>{
    showOrHidePassword(signUpPasswordInput, signUpHidePassword, signUpShowPassword);
}
signUpHidePasswordRepeat.onclick = () => {
    showOrHidePassword(signUpPasswordRepeatInput, signUpHidePasswordRepeat, signUpShowPasswordRepeat);
}
signUpShowPasswordRepeat.onclick = () =>{
    showOrHidePassword(signUpPasswordRepeatInput, signUpHidePasswordRepeat, signUpShowPasswordRepeat);
}

// ======================================================== Agree Configuration ===========================================================//
signUpAgreeCheckbox.onclick = () => {
    if(signUpAgreeCheckbox.checked){
        isChecked = true;
    }
    else{
        isChecked = false;
    }
    enableSubmitBtn();
};