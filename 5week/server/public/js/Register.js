"use strict";

const { format } = require("mysql");

const regisId = document.getElementById('register-id');
const regisPw = document.getElementById('register-pw');
const regisForm = document.getElementById('register-form');

//regisBut.addEventListener("click",checkPW);
regisForm.addEventListener('submit', (event) => {
    event.preventDefault();

    var regexPw = /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;

    if(regisId.value.length < 5)
    {
        alert("아이디는 5자 이상이어야 합니다.");
        return;
    }
    else if(!regexPw.test(regisPw.value))
    {
        alert("8~20자 공백을 제외한 영문 대소문자, 숫자, 특수문자를 사용하세요.");
        return;
    }

    regisForm.submit();
});