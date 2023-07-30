"use strict";

const loginPg = document.getElementById('Login-page');
const mainPg = document.getElementById('Main-page');
const titleH = document.getElementById("goMain");
const writePg = document.getElementById('write-btn');
const cookies = "<%= cookie %>";

if(cookies === "false") {
    document.querySelector(".sign-text").innerHTML = "로그인";
    document.querySelector(".sign-text").href = "/login";
} else {
    document.querySelector(".sign-text").innerHTML = "로그아웃";
    document.querySelector(".sign-text").href = "/logout";
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