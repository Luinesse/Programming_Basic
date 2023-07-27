"use strict";

const loginId = document.getElementById('login-id');
const loginPw = document.getElementById('login-pw');
const loginBtn = document.getElementById('login-button');
const regisBtn = document.getElementById('register');

function moveToHome() {
    location.replace("54.174.107.46/");
}

function moveToRegister() {
    location.href = "../html/Register.html";
}

function color() {
    if(loginId.value.length > 0 && loginPw.value.length >= 5) {
        loginBtn.style.backgroundColor = "#0095F6";
        loginBtn.disabled = false;
    } else {
        loginBtn.style.backgroundColor = "#C0DFFD";
        loginBtn.disabled = true;
    }
}

regisBtn.addEventListener("click", moveToRegister);
loginBtn.addEventListener("click", moveToHome);
loginId.addEventListener("keyup", color);
loginPw.addEventListener("keyup", color);