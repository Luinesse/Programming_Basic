"use strict";

const mainPg = document.getElementById('Main-page');
const titleH = document.getElementById("goMain");
const writePg = document.getElementById('write-btn');
const state = document.querySelector(".sign-text");

if(document.cookie.indexOf('user=') === -1) {
    state.textContent = 'Login';
    state.addEventListener('click', e => {
        location.href = '/login';
    });
}
else {
    const userhi = document.querySelector(".hi");
    userhi.textContent = document.cookie.split('user=')[1].split(';')[0] + '님 환영합니다.';
    state.textContent = 'Logout';
    state.addEventListener('click', e => {
        location.replace("/logout");
    });
}

function moveToWrite() {
    location.href = "/write";
}

function moveToMain() {
    location.href = "/";
}

mainPg.addEventListener("click",moveToMain);
writePg.addEventListener("click",moveToWrite);
titleH.addEventListener("click",moveToMain);