const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const mysql = require("mysql2");
// const Pool = require('mysql2/typings/mysql/lib/Pool');
  

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "usersdb",
  password: "%ghjD654dfbE&"
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=> {
res.sendFile(__dirname + '/index.html');
});


app.post('/checkin', urlencodedParser, (req,res)=> {
if (!req.body) return res.sendStatus(400);
let em = req.body.email;
let pas = req.body.password;
pool.query('select * from users where email=? and password=?', [em, pas], function (err, data) {
  if (err) return console.log(err);
console.log(data)
});
res.redirect('/');
});









app.listen(3000, ()=>console.log('server--3000'))