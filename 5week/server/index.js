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
const crypto = require('crypto');
const escape = require('escape-html');

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
		if(req.headers.referer === 'https://luinesse.store/login') {
			connection.query('SELECT * FROM userInfo WHERE id = ?', [id], (error, results, fields) => {
				if(error)	throw error;
				if(results.length > 0) {
					const salt = results[0].salt;
					const hashPw = crypto.createHash('sha256').update(password + salt).digest('hex');
	
					if(hashPw === results[0].pw) {
						if(req.session.user)
							res.redirect("/");
						else {
							req.session.user = {
								id: req.body.id,
							};
	
							req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
	
							res.setHeader('Set-Cookie', ['user=' + req.body.id]);
							res.redirect("/");
						}
					} else {
						res.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); location.href="/login";</script>');
					}
				} else {
					res.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); location.href="/login";</script>');
				}
			});
		} else {
			res.send('<script type="text/javascript">alert("잘못된 접근입니다."); location.href="/";</script>');
		}
	} else {
		res.send('<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요."); location.href="/login";</script>');
	}
});

app.post('/register', (req, res) => {
	const { id, password } = req.body;

	if(id && password) {
		if(req.headers.referer === 'https://luinesse.store/register') {
			const salt = crypto.randomBytes(16).toString('hex');
			const hashPw = crypto.createHash('sha256').update(password + salt).digest('hex');

			connection.query('SELECT * FROM userInfo WHERE id = ?', [id], (error, results, fields) => {
				if(error)	throw error;
				if(results.length <= 0) {
					connection.query('INSERT INTO userInfo (id, pw, salt) VALUES(?,?,?)', [id, hashPw, salt], (error, data) => {
						if(error)	throw error2;
						res.send('<script type="text/javascript">alert("회원가입이 완료됐습니다."); location.replace("/login");</script>');
					});
				} else {
					res.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); location.href="/register";</script>');
				}
			});
		} else {
			res.send('<script type="text/javascript">alert("잘못된 접근입니다."); location.href="/";</script>');
		}
	} else {
		res.send('<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); location.href="/register";</script>');
	}
});

app.post('/write', (req, res) => {
	const { wrote_title, wrote_article } = req.body;

	const wTitle = escape(wrote_title);
	const wArticle = escape(wrote_article);

	if(wrote_title && wrote_article) {
		if(req.headers.referer === 'https://luinesse.store/write') {
			connection.query('SELECT uid FROM userInfo WHERE id = ?', [req.session.user.id], (error, results, fields) => {
				if(error)	throw error;
				connection.query('INSERT INTO boardInfo (title, article, username, boardDate, userInfo_uid) VALUES(?,?,?,CURRENT_TIMESTAMP,?)', [wTitle, wArticle, req.session.user.id, results[0].uid], (error, data) => {
					if(error)	throw error2;
					res.send('<script type="text/javascript">alert("작성이 완료됐습니다."); location.replace("/");</script>');
				});
			});
		} else {
			res.send('<script type="text/javascript">alert("잘못된 접근입니다."); location.href="/";</script>');
		}
	} else {
		res.send('<script type="text/javascript">alert("제목과 내용을 입력해 주세요."); location.replace("/write");</script>');
	}
});

app.post('/comment', (req, res) => {
	const { bid, write_comment } = req.body;

	const wComment = escape(write_comment);

	if(typeof req.session.user === 'undefined' || typeof req.session.user.id === 'undefined') {
		res.send('<script type="text/javascript">alert("로그인 후 이용해 주세요."); location.replace("/");</script>');
	} else if(bid && write_comment) {
		if(req.header.referer === 'https://luinesse.store/') {
			connection.query('SELECT uid FROM userInfo WHERE id = ?', [req.session.user.id], (error, results, fields) => {
				if(error)	throw error;
				connection.query('INSERT INTO commentInfo (text, replyDate, username, userInfo_uid, boardInfo_bid) VALUES(?, CURRENT_TIMESTAMP, ?, ?, ?)', [wComment, req.session.user.id, results[0].uid, bid], (error, data) => {
					if(error)	throw error2;
					res.send('<script type="text/javascript">alert("등록이 완료됐습니다."); location.replace("/");</script>');
				});
			});
		} else {
			res.send('<script type="text/javascript">alert("잘못된 접근입니다."); location.href="/";</script>');
		}
	} else {
		res.send('<script type="text/javascript">alert("내용을 입력해주세요."); location.replace("/");</script>');
	}
});

app.post('/delete', (req, res) => {
	const { user, boardId } = req.body;

	if(boardId && user) {
		connection.query('SELECT username FROM boardInfo WHERE bid = ?', [boardId], (error, results, fields) => {
			if(error)	throw error;
			if(results[0].username == user) {
				connection.query('DELETE FROM boardInfo WHERE bid = ?', [boardId], (error, results, fields) => {
					if(error)	throw error2;
					res.json({ success : true });
				});
			} else {
				res.json({ success : false });
			}
		});
	} else {
		res.json({ success : false });
	}
});

app.post('/commentdel', (req, res) => {
	const { user, boardId, commentId } = req.body;
	
	if(boardId && user && commentId) {
		connection.query('SELECT username FROM commentInfo WHERE boardInfo_bid = ?', [boardId], (error, results, fields) => {
			if(error)	throw error;
			if(results[0].username == user) {
				connection.query('DELETE FROM commentInfo WHERE cid = ?', [commentId], (error, results, fields) => {
					if(error)	throw error2;
					res.json({ success : true });
				});
			} else {
				res.json({ success : false });
			}
		});
	} else {
		res.json({ success : false });
	}
});

app.post('/revise', (req, res) => {
	const { bid, wrote_title, wrote_article } = req.body;

	const wTitle = escape(wrote_title);
	const wArticle = escape(wrote_article);

	if(wrote_title && wrote_article && bid) {
		connection.query('UPDATE boardInfo SET title = ?, article = ? WHERE bid = ?', [wTitle, wArticle, bid], (error, results, fields) => {
			if(error)	throw error;
			res.send('<script type="text/javascript">alert("수정이 완료됐습니다."); location.replace("/");</script>');
		});
	} else {
		res.send('<script type="text/javascript">alert("수정에 실패했습니다."); location.replace("/");</script>');
	}
});

app.post('/revisereq', (req, res) => {
	const { user, boardId } = req.body;

	if(boardId && user) {
		connection.query('SELECT username FROM boardInfo WHERE bid = ?', [boardId], (error, results, fields) => {
			if(error)	throw error;
			if(results[0].username == user) {
				res.json({ success : true });
			} else {
				res.json({ success : false });
			}
		});
	} else {
		res.json({ success : false });
	}
});

app.post('/api/search', (req, res) => {
	const { page, searchText } = req.body;
	const perPage = 10;
	const search = `%${escape(searchText)}%`;

	const startIdx = (page - 1) * perPage;

	connection.query('SELECT COUNT(*) as totalCount FROM boardInfo WHERE title LIKE ? OR article LIKE ?',[search, search], (error, countResult) => {
		if(error)	throw error;
		const totalCount = countResult[0].totalCount;
		const totalPages = Math.ceil(totalCount / perPage);

		connection.query('SELECT * FROM boardInfo WHERE title LIKE ? OR article LIKE ? LIMIT ?, ?', [search, search, startIdx, perPage], (error, rows) => {
			if (error) throw error;
			
			res.json({ totalPages, posts: rows });
		});
	});
});

app.get('/api/posts',(req, res) => {
	const { page } = req.query;
	const perPage = 10;

	const startIdx = (page - 1) * perPage;

	connection.query('SELECT COUNT(*) as totalCount FROM boardInfo', (error, countResult) => {
		if(error)	throw error;
		const totalCount = countResult[0].totalCount;
		const totalPages = Math.ceil(totalCount / perPage);

		connection.query('SELECT * FROM boardInfo LIMIT ?, ?', [startIdx, perPage], (error, rows) => {
			if (error) throw error;
			
			res.json({ totalPages, posts: rows });
		});
	});
});

app.get('/comment/api/:bid', (req, res) => {
	connection.query('SELECT cid, text, replyDate, username FROM commentInfo WHERE boardInfo_bid = ?', [req.params.bid], (error, results, fields) => {
		if(error)	throw error;
		res.json({ comments : results });
	});
});

app.get('/',(req, res) => {
	console.log(req.session);
	res.sendFile(path.join(__dirname, './public', 'html', 'Main.html'));
});

app.get('/login', (req, res) => {
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

app.get('/revise/api/:bid', (req, res) => {
	connection.query('SELECT title, article FROM boardInfo WHERE bid = ?', [req.params.bid], (error, results, fields) => {
		if(error)	throw error;
		res.json({ title : results[0].title, contents : results[0].article });
	});
});

app.get('/revise/csr/:bid', (req, res) => {
	res.sendFile(path.join(__dirname, './public', 'html', 'Revise.html'));
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

