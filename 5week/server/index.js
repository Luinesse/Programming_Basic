const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./dbinfo.js');
const connection = mysql.createConnection(dbconfig);

const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');

app.use(express.static('public'));

app.get('/api',(req, res) => {
	connection.query('SELECT * FROM test', (error, rows) => {
		if (error) throw error;
		res.send(rows);
	});
});

app.get('/',(req, res) => {
	res.sendFile(path.join(__dirname, './public', 'html', 'Main.html'));
});

app.listen(port, () => {
	console.log('Example app listening on port ' + port);
});

app.use(
	cors({
		origin : 'http://54.174.107.46:3000',
		credentials : true
	})
);

