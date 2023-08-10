"use strict";

const mainPg = document.getElementById('Main-page');
const titleH = document.getElementById("goMain");
const state = document.querySelector(".sign-text");
const userhi = document.querySelector(".hi");
const listB = document.getElementById("list-btn");
const reviseB = document.getElementById("revise-btn");
const deleteB = document.getElementById("delete-btn");
const bid = document.location.pathname.split('/')[3];
const bidConst = document.getElementById("bidText");
let cid;

bidConst.value = bid;

fetch(`/board/api/${bid}`)
.then(res => res.json())
.then(myJson => {
    const title = document.querySelector('.input-title');
    const contents = document.querySelector('.input-article');
    title.textContent = myJson.title;
    contents.textContent = myJson.contents;
});

fetch(`/comment/api/${bid}`)
.then(res => res.json())
.then((res) => {
    const commentRow = document.querySelector(".comment_line");
    res.comments.forEach((row) => {
        const commentCell = document.createElement('div');
        const dStyle = {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '50%'
        };

        for(const [key, value] of Object.entries(dStyle)) {
            commentCell.style[key] = value;
        }

        ['cid', 'username', 'text', 'replyDate'].forEach((key) => {
            if(key === 'cid') {
                cid = row[key];
            } else {
                const commentList = document.createElement('p');
                const commentStyle = {
                    width: '25%',
                    textAlign: 'start',
                }

                for(const [key, value] of Object.entries(commentStyle)) {
                    commentList.style[key] = value;
                }

                if(key === 'replyDate') {
                    const dateValue = row[key].substring(0, 10);
                    commentList.textContent = dateValue;
                } else {
                    commentList.textContent = row[key];
                }

                commentCell.appendChild(commentList);
            }
        });
        const deleteComment = document.createElement('p');
        const deleteStyle = {
            width: '25%',
            textAlign: 'start'
        }

        for(const [key, value] of Object.entries(deleteStyle)) {
            deleteComment.style[key] = value;
        }
        deleteComment.textContent = "삭제";
        deleteComment.addEventListener("click", () => {
            if(document.cookie.indexOf('user=' === 1)) {
                alert("로그인 후 이용해 주세요.");
            } else {
                const reqData = {
                    user : document.cookie.split('user=')[1].split(';')[0],
                    boardId : bid,
                    commentId : cid,
                };

                fetch('/commentdel', {
                    method: 'POST',
                    headers : {
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
                        alert("사용자의 댓글이 아니거나 로그인 상태를 확인해 주세요.");
                    }
                })
                .catch(error => {
                    console.error("ERROR : ", error);
                });
            }
        });
        commentCell.appendChild(deleteComment);
        commentRow.appendChild(commentCell);
    });
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