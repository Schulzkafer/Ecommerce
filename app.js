  const express = require('express');
  const app = express();
  const bodyParser = require("body-parser");
  const urlencodedParser = bodyParser.urlencoded({extended: false});
  const jsonParser = bodyParser.json();
  const mysql = require("mysql2");
  const fs = require('fs');
  
  const laptopRouter = express.Router();
  const cell_phoneRouter = express.Router();
  



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
  
  app.use(express.static(__dirname + '/public'));
  
  app.get('/', (req, res)=> {
    res.render('index.hbs');
  });

  app.get('/userpage', (req, res)=> {
    res.render('user-page.hbs');
  });
  
  app.get('/openregistration', (req, res)=> {
    res.render('registration.hbs') 
  });
  
  app.post('/checkin', jsonParser, (req,res)=> {
    if (!req.body) return res.sendStatus(400);
    let em = req.body.email;
    let pas = req.body.password;
    pool.query('select * from users where email=? and password=?', [em, pas], function (err, data) {
      console.log(data)
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

app.post('/changeDataUser', jsonParser, (req,res)=> {
  if (!req.body) res.sendStatus(400);
  console.log(req.body)
});


  
  laptopRouter.get('/', (req, res)=> {
    pool.query('select id, ProductName, Manufacturer, ProductCount, Price, ImageCode, InfoItem from laptops', function (err, data) {
      if (err) res.sendStatus(500);
      else {
        data.map(x=>x['dir'] = '/laptops/observer')
        let url = ('http://' + req.headers.host + '/laptops/observer');
        res.render('laptops-cell_phones.hbs', {
          items: data,
          
        }); 
      }
    });
  });
  
  cell_phoneRouter.get('/', (req, res)=> {
    pool.query('select id, ProductName, Manufacturer, ProductCount, Price, ImageCode from cell_phones', function (err, data) {
      if (err) res.sendStatus(500);
      else {
        data.map(x=>x['dir'] = '/cell_phones/observer')
        res.render('laptops-cell_phones.hbs', {
          items: data
        });
      }
    });
  });
  
  
  laptopRouter.get('/observer/:productId', (req, res)=> {
    let param = (req.params["productId"]);
    pool.query('select id, ProductName, Manufacturer, ProductCount, Price, ImageCode, InfoItem from laptops where id=?', [param], function (err, data) {
      res.render('one-Unit-Laptop-Cell_phone.hbs', {
        item: data,
      });
    });
  });
  
  cell_phoneRouter.get('/observer/:productId', (req, res)=> {
    let param = (req.params["productId"]);
      pool.query('select id, ProductName, Manufacturer, ProductCount, Price, ImageCode, InfoItem from cell_phones where id=?', [param], function (err, data) {
       res.render('one-Unit-Laptop-Cell_phone.hbs', {
        item: data,
      });
    });
  });
  
  app.listen(3000, ()=>console.log('server--3000'))