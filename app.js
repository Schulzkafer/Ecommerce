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

app.get('/laptops', (req, res)=> {
pool.query('select * from laptops where ProductCount !=?', [0], function (err, data) {
  if (err) res.sendStatus(500);
  else {
    res.sendStatus(200);
    console.log(data)
  }
});
});



app.post('/checkin', jsonParser, (req,res)=> {
if (!req.body) return res.sendStatus(400);
let em = req.body.email;
let pas = req.body.password;
pool.query('select * from users where email=? and password=?', [em, pas], function (err, data) {
if (err) res.sendStatus(500);
else if (!data.length) res.sendStatus(401);
else res.sendStatus(200);
});
});

app.post('/registration', jsonParser, (req,res)=> {
  if (!req.body) return res.sendStatus(400);
  let em = req.body.em;
  let pas = req.body.pas;
  pool.query('select * from users where email=? and password=?', [em, pas], function (err, data) {
  if (err) {
    res.sendStatus(500);
  } else if (!data.length) {
    pool.query('insert into users (email, password) values (?, ?)', [em, pas], function (error, inf) {
     (error) ? res.sendStatus(500) : res.sendStatus(200);
  });
  } else res.sendStatus(400);
  });
  });









app.listen(3000, ()=>console.log('server--3000'))