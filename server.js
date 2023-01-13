const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs'); // set the view engine to ejs
app.use(express.static('views')); // serve the views directory as static files

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

app.listen(8000, () => {
  console.log('Server listening on http://localhost:8000');
});
