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
		secret : "my key",
		resave : true,
		saveUninitialized : true,
	} )
);
app.use(express.urlencoded({ extended : false }));
app.use(express.static('public'));

app.use(
	cors({
		origin : 'http://54.174.107.46:3000',
		credentials : true
	})
);

app.post('/register', (req, res) => {
	const { id, password } = req.body;
	
	if(id && password) {
		connection.query('SELECT * FROM userInfo WHERE id = ?', [id], (error, results, fields) => {
			if(error)	throw error;
			if(results.length <= 0) {
				connection.query('INSERT INTO userInfo (id, pw) VALUES(?,?)', [id, password], (error, data) => {
					if(error)	throw error2;
					res.send('<script type="text/javascript">alert("회원가입이 완료됐습니다."); location.replace("/login");</script>');
				})
			} else {
				res.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); location.href="/register";</script>');
			}
		})
	} else {
		res.send('<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); location.href="/register";</script>');
	}
})

app.get('/api',(req, res) => {
	connection.query('SELECT * FROM boardInfo', (error, rows) => {
		if (error) throw error;
		res.send(rows);
	});
});

app.get('/',(req, res) => {
	res.sendFile(path.join(__dirname, './public', 'html', 'Main.html'));
});

app.get('/login',(req, res) => {
	res.sendFile(path.join(__dirname, './public', 'html', 'Login.html'));
});

app.get('/register',(req, res) => {
	res.sendFile(path.join(__dirname, './public', 'html', 'Register.html'));
});

app.get('/write',(req, res) => {
	res.sendFile(path.join(__dirname, './public', 'html', 'Write.html'));
});

app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});

