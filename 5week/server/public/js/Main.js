"use strict";

//const loginPg = document.getElementById('Login-page');
const mainPg = document.getElementById('Main-page');
const titleH = document.getElementById("goMain");
const writePg = document.getElementById('write-btn');

function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while(x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if(document.cookie.substring(x,y) == nameOfCookie) {
            if((endOfCookie = document.cookie.indexOf(";",y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf("",x) + 1;
        if(x == 0)
            break;
    }
    return "";
}

var cookie = getCookie("user");
if(cookie != "") {
    document.querySelector(".sign-text").innerHTML = "Logout";
    document.querySelector(".sign-text").href = "./logout";
} else {
    document.querySelector(".sign-text").innerHTML = "Login";
    document.querySelector(".sign-text").href = "./login";
}

function moveToWrite() {
    location.href = "/write";
}

function moveToMain() {
    location.href = "/";
}

//function moveToLogin() {
//    location.href = "/login";
//}

//loginPg.addEventListener("click",moveToLogin);
mainPg.addEventListener("click",moveToMain);
writePg.addEventListener("click",moveToWrite);
titleH.addEventListener("click",moveToMain);