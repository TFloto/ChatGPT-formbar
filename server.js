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
    guestNames.set(ip, {name: `Guest ${Math.floor(Math.random() * 900000) + 100000}`, thumb: ""});
  }
  visitors.add(ip);
  next();
});

app.get('/', (req, res) => {
  res.render('index.ejs', { menu: [], visitors: guestNames });
});

app.get('/tutd', (req, res) => {
  res.render('tutd.ejs', { buttons: [
    { name: 'upthumb', url: '/tutd/upthumb' },
    { name: 'removethumb', url: '/removethumb' }
  ], visitors: guestNames });
});

app.get('/tutd/upthumb', (req, res) => {
  let ip = req.connection.remoteAddress;
  // update the guestNames map with the thumb status
  guestNames.set(ip, {name: guestNames.get(ip).name, thumb: "up"});
  res.render('tutd.ejs', { buttons: [
  { name: 'upthumb', url: '/upthumb' },
  { name: 'removethumb', url: '/removethumb' }
  ], visitors: guestNames });
});


app.get('/users', (req, res) => {
res.render('users.ejs', { visitors: guestNames });
});

app.get('/login', (req, res) => {
  res.render('login.ejs', { visitors: guestNames });
  });
  
  app.listen(8000, () => {
  console.log('Server listening on http://localhost:8000');
  });