"use strict";

const loginPg = document.getElementById('Login-page');
const mainPg = document.getElementById('Main-page');
const titleH = document.getElementById("goMain");
const writePg = document.getElementById('write-btn');

function moveToWrite() {
    location.href = "../html/Write.html";
}

function moveToMain() {
    location.href = "54.174.107.46/";
}

function moveToLogin() {
    location.href = "../html/Login.html";
}

loginPg.addEventListener("click",moveToLogin);
mainPg.addEventListener("click",moveToMain);
writePg.addEventListener("click",moveToWrite);
titleH.addEventListener("click",moveToMain);