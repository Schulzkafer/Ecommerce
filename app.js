const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
const mysql = require("mysql2");
const fs = require('fs');

const laptopRouter = express.Router();
const cell_phoneRouter = express.Router();
const userRouter = express.Router();




const hbs = require("hbs");
app.set('/view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "127.0.0.1",
  user: "root",
  database: "usersdb",
  password: "%ghjD654dfbE&"
});

app.use("/laptops", laptopRouter);
app.use("/cell_phones", cell_phoneRouter);
app.use("/userpage", userRouter);


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.hbs');
});

userRouter.get('/', (req, res) => {
  res.render('user-page.hbs');
});

userRouter.get('/addCredit', (req, res) => {
  res.render('add-credit.hbs');
});


app.get('/openregistration', (req, res) => {
  res.render('registration.hbs')
});

app.post('/checkin', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let em = req.body.email;
  let pas = req.body.password;
  pool.query('select * from users where email=? and password=?', [em, pas], function (err, data) {
    if (err) res.sendStatus(500);
    else if (!data.length) res.sendStatus(401);
    else res.status(200).send(JSON.stringify(data));
  });
});

app.post('/registration', jsonParser, (req, res) => {
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

app.post('/addCredit', jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);
  let b = req.body;
  pool.query('update users set credit = credit + ? where id=?', [b.suminput, b.idUserInput], (err, inf) => {
    if (err) {
      res.sendStatus(500);
      return
    }

    pool.query('select credit from users where id=?', [b.idUserInput], (erro, info, fields) => {
      console.log(info)
      if (erro) res.sendStatus(500)
      else res.status(200).send(JSON.stringify(info))

    });
  });

});


app.put('/changeDataUser', jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);
  let b = req.body;
  pool.query('update users set email=?, name=?, surname=? where id=? and password=?', [b.changeemail || null, b.changename, b.changesurname, b.idUser, b.passwordconfirm], (error, data) => {

    if (error) res.sendStatus(500);
    else if (!data || data.changedRows == 0 && data.affectedRows == 0) res.sendStatus(401);
    else {
      delete b.passwordconfirm;
      res.status(200).send(JSON.stringify(b));
    }
  });
});

app.put('/changePassword', jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);
  let b = req.body;
  pool.query('update users set password=? where id=? and password=?', [b.newpassword, b.idUser, b.actpassword], (error, data) => {
    if (error) res.sendStatus(500);
    else if (data.affectedRows == 0 && data.changedRows == 0) res.sendStatus(400);
    else res.sendStatus(200);
  });
});


laptopRouter.get('/', (req, res) => {
  pool.query('select id, ProductName, Manufacturer, ProductCount, Price, ImageCode, InfoItem from laptops', function (err, data) {
    if (err) res.sendStatus(500);
    else {
      data.map(x => x['dir'] = '/laptops/observer')
      let url = ('http://' + req.headers.host + '/laptops/observer');
      res.render('laptops-cell_phones.hbs', {
        items: data,

      });
    }
  });
});

cell_phoneRouter.get('/', (req, res) => {
  pool.query('select id, ProductName, Manufacturer, ProductCount, Price, ImageCode from cell_phones', function (err, data) {
    if (err) res.sendStatus(500);
    else {
      data.map(x => x['dir'] = '/cell_phones/observer')
      res.render('laptops-cell_phones.hbs', {
        items: data
      });
    }
  });
});


laptopRouter.get('/observer/:productId', (req, res) => {
  let param = (req.params["productId"]);
  pool.query('select id, ProductName, Manufacturer, ProductCount, Price, ImageCode, InfoItem from laptops where id=?', [param], function (err, data) {
    res.render('one-Unit-Laptop-Cell_phone.hbs', {
      item: data,
    });
  });
});

cell_phoneRouter.get('/observer/:productId', (req, res) => {
  let param = (req.params["productId"]);
  pool.query('select id, ProductName, Manufacturer, ProductCount, Price, ImageCode, InfoItem from cell_phones where id=?', [param], function (err, data) {
    res.render('one-Unit-Laptop-Cell_phone.hbs', {
      item: data,
    });
  });
});

app.listen(3000, () => console.log('server--3000'))