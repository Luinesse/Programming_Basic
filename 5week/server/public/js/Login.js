"use strict";

const loginId = document.getElementById('login-id');
const loginPw = document.getElementById('login-pw');
const loginBtn = document.getElementById('login-button');
const regisBtn = document.getElementById('register');
const csrfToken = document.getElementById('csrf-token');

document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        document.body.classList.remove('fade');
    });

    csrfToken.value = document.cookie.split('_csrf=')[1].split(';')[0];
});

document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

function moveToRegister() {
    location.href = "/register";
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
loginId.addEventListener("keyup", color);
loginPw.addEventListener("keyup", color);