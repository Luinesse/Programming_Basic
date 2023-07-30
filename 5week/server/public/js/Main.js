"use strict";

const loginPg = document.getElementById('Login-page');
const mainPg = document.getElementById('Main-page');
const titleH = document.getElementById("goMain");
const writePg = document.getElementById('write-btn');

function getCookie(name) {
    let matches = document.cookie.match(new RegExp (
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function moveToWrite() {
    location.href = "/write";
}

function moveToMain() {
    location.href = "/";
}

if(getCookie(user) != undefined) {
    document.querySelector(".sign-text").innerHTML = "로그인";
    document.querySelector(".sign-text").href = "/login";
} else {
    document.querySelector(".sign-text").innerHTML = "로그아웃";
    document.querySelector(".sign-text").href = "/logout";
}

mainPg.addEventListener("click",moveToMain);
writePg.addEventListener("click",moveToWrite);
titleH.addEventListener("click",moveToMain);