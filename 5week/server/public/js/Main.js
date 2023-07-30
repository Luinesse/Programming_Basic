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
    state.textContent = 'Logout';
    state.addEventListener('click', e => {
        location.href = '/logout';
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