document.addEventListener("DOMContentLoaded", StartPage);

function StartPage(){
    "use strict";
    function CreateCaptcha() {
        let numberRandom = Math.floor((Math.random() * 1000000));
        document.querySelector('#captcha').innerHTML = numberRandom;
    }
    
    function ValidCaptcha() {
        let captcha = document.querySelector('#captcha').innerHTML;
        let numberUser = document.querySelector('#number-user').value;
        let register = document.querySelector('#register');
        let validation = document.querySelector('#validation');
        if (captcha == numberUser) {
            validation.innerHTML = "Correct! Click below to register";
            register.disabled = false;
        }
        else {
            validation.innerHTML = "Incorrect number. Try again";
            register.disabled = true;
        }
    }
    
    CreateCaptcha();
    
    let verification = document.querySelector('#button-check');
    verification.addEventListener("click", ValidCaptcha);
}