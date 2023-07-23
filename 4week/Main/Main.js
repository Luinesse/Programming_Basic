"use strict";

const loginPg = document.getElementById('Login-page');
const mainPg = document.getElementById('Main-page');

function moveToMain() {
    location.href = "./Main.html";
}

function moveToLogin() {
    location.href = "../Login/Login.html";
}

loginPg.addEventListener("click",moveToLogin);
mainPg.addEventListener("click",moveToMain);