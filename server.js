const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs'); // set the view engine to ejs
app.use(express.static('views')); // serve the views directory as static files

let guestNames = new Map();
let visitors = new Set();

app.use((req, res, next) => {
  let ip = req.connection.remoteAddress;
  if(!guestNames.has(ip)){
    guestNames.set(ip, `Guest ${Math.floor(Math.random() * 900000) + 100000}`);
  }
  visitors.add(ip);
  next();
});

app.get('/', (req, res) => {
  res.render('index.ejs', { menu: [] });
});

app.get('/tutd', (req, res) => {
  res.render('tutd.ejs', { buttons: [
    { name: 'upthumb', url: '/upthumb' },
    { name: 'wigglethumb', url: '/wigglethumb' },
    { name: 'downthumb', url: '/downthumb' },
    { name: 'removethumb', url: '/removethumb' }
  ]});
});

app.get('/users', (req, res) => {
  let ipToName = new Map();
  guestNames.forEach((value, key) => {
    ipToName.set(key, value)
  });
  res.render('users.ejs', { visitors: ipToName });
});


app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.listen(8000, () => {
  console.log('Server listening on http://localhost:8000');
});
