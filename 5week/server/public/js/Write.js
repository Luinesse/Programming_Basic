"use strict";

const mainPg = document.getElementById("Main-page");
const titleH = document.getElementById("goMain");
const uploadBtn = document.getElementById("upload-btn");
const state = document.querySelector(".sign-text");
const userhi = document.querySelector(".hi");

if(document.cookie.indexOf('user=') === -1) {
    state.textContent = 'Login';
    state.addEventListener('click', e => {
        location.href = '/login';
    });
}
else {
    userhi.textContent = document.cookie.split('user=')[1].split(';')[0] + '님 환영합니다.';
    state.textContent = 'Logout';
    state.addEventListener('click', e => {
        location.replace("/logout");
    });
}

function moveToMain() {
    location.replace("/");
}

mainPg.addEventListener("click",moveToMain);
titleH.addEventListener("click",moveToMain);