"use strict";

const mainPg = document.getElementById('Main-page');
const titleH = document.getElementById("goMain");
const writePg = document.getElementById('write-btn');
const state = document.querySelector(".sign-text");
const userhi = document.querySelector(".hi");
let page = 1;
let pageIdx = 1;
let cnt = 1;

function fetchPage() {
    fetch(`https://luinesse.store/api/${page}`)
            .then((res) => res.json())
            .then((res) => {
                const board = document.querySelector('.article');
                res.forEach((row) => {
                    const divCell = document.createElement('div');
                    const style = {
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '50%',
                        alignItems: 'center'
                    };

                    for(const [key, value] of Object.entries(style)) {
                        divCell.style[key] = value;
                    }

                    ['title', 'article', 'username', 'boardDate'].forEach((key) => {
                        let name;
                        if(key === 'title') {
                            name = 'h3';
                        } else {
                            name = 'p'
                        }
                        const element = document.createElement(name);
                        const hStyle = {
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            width: '25%',
                            textAlign: 'start'
                        };

                        for(const [key, value] of Object.entries(hStyle)) {
                            element.style[key] = value;
                        }
                        if(key === 'title') {
                            const link = document.createElement('a');
                            const linkStyle = {
                                textDecoration : 'none'
                            };

                            for(const [key, value] of Object.entries(linkStyle)) {
                                link.style[key] = value;
                            }
                            ['bid'].forEach((key) => {
                                link.href = '/board/csr/' + row[key];
                            });
                            link.textContent = row[key];
                            element.appendChild(link);
                        } else if (key === 'boardDate') {
                            const dateValue = row[key].substring(0, 10);
                            element.textContent = dateValue;
                        } else {
                            element.textContent = row[key];
                        }
                        divCell.appendChild(element);
                    });
                    const hr = document.createElement('hr');
                    hr.style.width = '1400px';
                    board.appendChild(divCell);
                    board.appendChild(hr);
                    cnt++;
                    if(cnt == 10) {
                        pageIdx++;
                        cnt = 1;
                    }
                });
                const pageClass = document.querySelector(".pageNum");
                for(var i = 1; i <= pageIdx; i++) {
                    const num = document.createElement('li');
                    const listStyle = {
                        float: 'left',
                        marginRight: "20px"
                    };

                    for(const [key, value] of Object.entries(listStyle)) {
                        num.style[key] = value;
                    }
                    num.textContent = i;
                    pageClass.appendChild(num);
                }
            });
}

function pageClick(event) {
    const clickPage = parseInt(event.target.textContent);
    page = clickPage;

    fetchPage();
}

document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        document.body.classList.remove('fade');
    });

    fetchPage();

    const pageNumber = document.querySelectorAll(".pageNum li");

    pageNumber.forEach((li) => {
        li.addEventListener("click", pageClick);
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

function moveToWrite() {
    location.href = "/write";
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

mainPg.addEventListener("click",moveToMain);
writePg.addEventListener("click",moveToWrite);
titleH.addEventListener("click",moveToMain);