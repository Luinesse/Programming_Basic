#!/usr/bin/node

const express = require('express');
const mysql = require('mysql');
const dbconfig = require('../../../test/dbinfo.js');
const connection = mysql.createConnection(dbconfig);
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded( {
		extended : false,
	} )
);
app.use(cookieParser());
app.use(
	session( {
		secret : 'g7$In!2@S#%9Oc$5mB',
		resave : true,
		saveUninitialized : true,
	} )
);
app.use(express.urlencoded({ extended : false }));
app.use(express.static('public'));

app.use(
	cors({
		origin : 'https://luinesse.store',
		credentials : true
	})
);

app.post('/login', (req, res) => {
	const { id, password } = req.body;

	if(id && password) {
		connection.query('SELECT * FROM userInfo WHERE id = ? AND pw = ?', [id, password], (error, results, fields) => {
			if(error)	throw error;
			if(results.length > 0) {
				if(req.session.user)
					res.redirect("/");
				else {
					req.session.user = {
						id : req.body.id,
					}

					res.setHeader('Set-Cookie', ['user=' + req.body.id]);
					res.redirect("/");
				}
			} else {
				res.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); location.href="/login";</script>');
			}
		});
	} else {
		res.send('<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요."); location.href="/login";</script>');
	}
});

app.post('/register', (req, res) => {
	const { id, password } = req.body;
	
	if(id && password) {
		connection.query('SELECT * FROM userInfo WHERE id = ?', [id], (error, results, fields) => {
			if(error)	throw error;
			if(results.length <= 0) {
				connection.query('INSERT INTO userInfo (id, pw) VALUES(?,?)', [id, password], (error, data) => {
					if(error)	throw error2;
					res.send('<script type="text/javascript">alert("회원가입이 완료됐습니다."); location.replace("/login");</script>');
				});
			} else {
				res.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); location.href="/register";</script>');
			}
		});
	} else {
		res.send('<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); location.href="/register";</script>');
	}
});

app.post('/write', (req, res) => {
	const { wrote_title, wrote_article } = req.body;

	if(wrote_title && wrote_article) {
		connection.query('SELECT uid FROM userInfo WHERE id = ?', [req.session.user.id], (error, results, fields) => {
			if(error)	throw error;
			connection.query('INSERT INTO boardInfo (title, article, username, boardDate, userInfo_uid) VALUES(?,?,?,CURRENT_TIMESTAMP,?)', [wrote_title, wrote_article, req.session.user.id, results[0].uid], (error, data) => {
				if(error)	throw error2;
				res.send('<script type="text/javascript">alert("작성이 완료됐습니다."); location.replace("/");</script>');
			});
		});
	} else {
		res.send('<script type="text/javascript">alert("제목과 내용을 입력해 주세요."); location.replace("/write");</script>');
	}
});

app.post('/delete', (req, res) => {
	const { value, delPw, bid } = req.body;
	if(value && delPw && bid) {
		connection.query('SELECT id, pw FROM userInfo WHERE id = ? AND pw = ?', [value, delPw], (error, results, fields) => {
			if(error)	throw error;
			if(results.length > 0) {
				connection.query('DELETE FROM boardInfo WHERE bid = ?', [bid], (error, results, fields) => {
					if(error)	throw error2;
					res.send('<script type="text/javascript">alert("삭제가 완료됐습니다."); location.replace("/");</script>');
				});
			} else {
				res.send('<script type="text/javascript">alert("비밀번호를 다시 확인해 주세요."); location.replace("/");</script>');
			}
		});
	} else {
		res.send(req.body);
	}
});

app.get('/api',(req, res) => {
	connection.query('SELECT * FROM boardInfo', (error, rows) => {
		if (error) throw error;
		res.send(rows);
	});
});

app.get('/',(req, res) => {
	console.log(req.session);
	res.sendFile(path.join(__dirname, './public', 'html', 'Main.html'));
});

app.get('/login',(req, res) => {
	res.sendFile(path.join(__dirname, './public', 'html', 'Login.html'));
});

app.get('/register',(req, res) => {
	res.sendFile(path.join(__dirname, './public', 'html', 'Register.html'));
});

app.get('/write',(req, res) => {
	if(req.session.user)
		res.sendFile(path.join(__dirname, './public', 'html', 'Write.html'));
	else
		res.send('<script type="text/javascript">alert("로그인 후 이용해 주세요."); location.href="/";</script>');
});

app.get('/board/api/:bid', (req, res) => {
	connection.query('SELECT title, article FROM boardInfo WHERE bid = ?', [req.params.bid], (error, results, fields) => {
		if(error)	throw error;
		res.json({ title : results[0].title, contents : results[0].article });
	});
});

app.get('/board/csr/:bid', (req, res) => {
	res.sendFile(path.join(__dirname, './public', 'html', 'Board.html'));
});

app.get('/logout',(req,res) => {
	req.session.destroy((err) => {
		if(err)
			console.log(err);
		else {
			res.clearCookie('user');
			res.redirect("/");
		}
	});
});

app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});

