import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


const port = 3000;

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});





app.listen(port, () => 
  console.log(`Server running at http://localhost:${port}`)
);