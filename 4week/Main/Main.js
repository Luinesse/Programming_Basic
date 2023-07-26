"use strict";

const loginPg = document.getElementById('Login-page');
const mainPg = document.getElementById('Main-page');
const writePg = document.getElementById('write-btn');

function moveToWrite() {
    location.href = "../Write/Write.html";
}

function moveToMain() {
    location.href = "./Main.html";
}

function moveToLogin() {
    location.href = "../Login/Login.html";
}

loginPg.addEventListener("click",moveToLogin);
mainPg.addEventListener("click",moveToMain);
writePg.addEventListener("click",moveToWrite);