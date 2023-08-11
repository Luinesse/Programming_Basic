"use strict";

const mainPg = document.getElementById('Main-page');
const titleH = document.getElementById("goMain");
const writePg = document.getElementById('write-btn');
const state = document.querySelector(".sign-text");
const userhi = document.querySelector(".hi");
const searchCur = document.querySelector(".search_post");
let searchText;
let currentPage = 1;
let totalPages = 1;

function createPageBtn() {
    const pageList = document.querySelector(".pageNum");
    pageList.innerHTML = "";

    for(let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("li");
        const btnStyle = {
            float: "left",
            marginRight: "20px"
        };

        for(const [key, value] of Object.entries(btnStyle)) {
            pageBtn.style[key] = value;
        }

        pageBtn.textContent = i;
        pageBtn.addEventListener("click", () => {
            currentPage = i;
            fetchPage();
        });
        pageList.appendChild(pageBtn);
    }
}

function createSearchPageBtn() {
    const pageList = document.querySelector(".pageNum");
    pageList.innerHTML = "";

    for(let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("li");
        const btnStyle = {
            float: "left",
            marginRight: "20px"
        };

        for(const [key, value] of Object.entries(btnStyle)) {
            pageBtn.style[key] = value;
        }

        pageBtn.textContent = i;
        pageBtn.addEventListener("click", () => {
            currentPage = i;
            searchPage();
        });
        pageList.appendChild(pageBtn);
    }
}

function searchPage() {
    fetch(`https://luinesse.store/api/search?page=${currentPage}?search=${searchText}`)
    .then((res) => res.json())
    .then((res) => {
        totalPages = res.totalPages;
        createSearchPageBtn();

        const board = document.querySelector('.article');
        const articleNav = document.querySelector(".article-nav");
        board.innerHTML = '';
        board.appendChild(articleNav);
        createPageBtn();
        res.posts.forEach((row) => {
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
        });
});
}

function fetchPage() {
    fetch(`https://luinesse.store/api/posts?page=${currentPage}`)
    .then((res) => res.json())
    .then((res) => {
        totalPages = res.totalPages;
        createPageBtn();

        const board = document.querySelector('.article');
        const articleNav = document.querySelector(".article-nav");
        board.innerHTML = '';
        board.appendChild(articleNav);
        createPageBtn();
        res.posts.forEach((row) => {
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
        });
});
}

function initPage() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';

    window.setTimeout(() => {
        document.body.classList.remove('fade');
    });

    const categoryButton = document.querySelector('.category-button');
    const menu = document.querySelector('.menu');

    categoryButton.addEventListener('click', () => {
        menu.classList.toggle('open');
    });

    const urlParams = new URLSearchParams(window.location.search);
    currentPage = parseInt(urlParams.get('page')) || 1;

    createPageBtn();

    fetchPage();
}

function searchPost() {
    const searchContent = document.querySelector(".search_content");
    searchText = searchContent.value;
    currentPage = 1;
    searchPage();
}

document.addEventListener('DOMContentLoaded', () => {
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
});

function moveToWrite() {
    location.href = "/write";
}

function moveToMain() {
    location.href = "/";
}

document.addEventListener("DOMContentLoaded",initPage);
mainPg.addEventListener("click",moveToMain);
writePg.addEventListener("click",moveToWrite);
titleH.addEventListener("click",moveToMain);
searchCur.addEventListener("submit", searchPost);