"use strict";

const mainPg = document.getElementById("Main-page");
const titleH = document.getElementById("goMain");
const uploadBtn = document.getElementById("upload-btn");

function moveToMain() {
    location.replace("../Main/Main.html");
}

function upload() {

}

mainPg.addEventListener("click",moveToMain);
titleH.addEventListener("click",moveToMain);