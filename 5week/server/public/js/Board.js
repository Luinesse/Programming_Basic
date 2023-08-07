"use strict";

const mainPg = document.getElementById('Main-page');
const titleH = document.getElementById("goMain");
const state = document.querySelector(".sign-text");
const userhi = document.querySelector(".hi");
const listB = document.getElementById("list-btn");
const reviseB = document.getElementById("revise-btn");
const deleteB = document.getElementById("delete-btn");
const bid = document.location.pathname.split('/')[3];

fetch(`/board/api/${bid}`)
.then(res => res.json())
.then(myJson => {
    const title = document.querySelector('.input-title');
    const contents = document.querySelector('.input-article');
    title.textContent = myJson.title;
    contents.textContent = myJson.contents;
});

document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        document.body.classList.remove('fade');
    });

    const bidConst = document.getElementById("bidType");

    bidConst.value = bid;

});

document.addEventListener('DOMContentLoaded', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

if(document.cookie.indexOf('user=') === -1) {
    state.textContent = 'Login';
    state.addEventListener('click', e => {
        location.href = '/login';
    });
}
else {
    userhi.textContent = document.cookie.split('user=')[1].split(';')[0] + '님 환영합니다.';
    state.textContent = 'Logout';
    state.addEventListener('click', e => {
        location.replace("/logout");
    });
}

//글 삭제, 글 수정, 목록으로 가기 버튼

function deleteAct() {
    if(document.cookie.indexOf('user=') === -1) {
        alert("로그인 후 이용해 주세요.");
    } else {
        const reqData = {
            user : document.cookie.split('user=')[1].split(';')[0],
            boardId : bid,
        };

        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(reqData),
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                alert("삭제가 완료됐습니다.");
                location.replace("/");
            } else {
                alert("사용자의 게시물이 아니거나 로그인 상태를 확인해주세요.");
            }
        })
        .catch(error => {
            console.error("ERROR : ", error);
        });
    }
}

function reviseAct() {
    if(document.cookie.indexOf('user=') === -1) {
        alert("로그인 후 이용해 주세요.");
    } else {
        const reqData = {
            user : document.cookie.split('user=')[1].split(';')[0],
            boardId : bid,
        };

        fetch('/revisereq', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(reqData),
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                location.href = "/revise/csr/" + bid;
            } else {
                alert("사용자의 게시물이 아니거나 로그인 상태를 확인해주세요.");
            }
        })
        .catch(error => {
            console.error("ERROR : ", error);
        });
    }
}

function moveToMain() {
    location.href = "/";
}

document.addEventListener('DOMContentLoaded', () => {
    const categoryButton = document.querySelector('.category-button');
    const menu = document.querySelector('.menu');

    categoryButton.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
});

reviseB.addEventListener("click",reviseAct);
deleteB.addEventListener("click",deleteAct);
listB.addEventListener("click",moveToMain);
mainPg.addEventListener("click",moveToMain);
titleH.addEventListener("click",moveToMain);