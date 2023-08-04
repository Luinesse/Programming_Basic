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
    let input = confirm('정말로 게시글을 삭제하시겠습니까 ?');
    if(input) {
        if(document.cookie.indexOf('user=') === -1) {
            alert("로그인 후 이용해 주세요.");
        } else {
            let value = document.cookie.split('user=')[1].split(';')[0];
            let delPw = prompt('비밀번호를 입력해주세요.');

            const formData = new FormData();
            formData.append('id', value);
            formData.append('delPw', delPw);
            formData.append('bid', bid);

            fetch('https://luinesse.store/delete', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error : ', error);
            });
        }
    } else {
        alert("전송 실패");
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

deleteB.addEventListener("click",deleteAct);
listB.addEventListener("click",moveToMain);
mainPg.addEventListener("click",moveToMain);
titleH.addEventListener("click",moveToMain);