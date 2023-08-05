"use strict";

const mainPg = document.getElementById("Main-page");
const titleH = document.getElementById("goMain");
const uploadBtn = document.getElementById("upload-btn");
const wstate = document.querySelector(".write-text");
const wuserhi = document.querySelector(".write-hi");
const bid = document.location.pathname.split('/')[3];

fetch(`/revise/api/${bid}`)
.then(res => res.json())
.then(myJson => {
    const title = document.querySelector('.title-text');
    const contents = document.querySelector('.wrote-article');
    title.innerHTML = myJson.title;
    contents.innerHTML = myJson.contents;
});

document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        document.body.classList.remove('fade');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

if(document.cookie.indexOf('user=') === -1) {
    wstate.textContent = 'Login';
    wstate.addEventListener('click', e => {
        location.href = '/login';
    });
}
else {
    wuserhi.textContent = document.cookie.split('user=')[1].split(';')[0] + '님 환영합니다.';
    wstate.textContent = 'Logout';
    wstate.addEventListener('click', e => {
        location.replace("/logout");
    });
}

function moveToMain() {
    location.replace("/");
}

mainPg.addEventListener("click",moveToMain);
titleH.addEventListener("click",moveToMain);