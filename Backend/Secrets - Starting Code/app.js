import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
}); 


userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);

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

app.post('/register', async (req, res) => {
  try {
    console.log("Registration attempt with:", req.body);
    
    const newUser = new User({
      email: req.body.username,
      password: req.body.password
    });

    await newUser.save();
    console.log("User saved successfully");
    res.render('secrets');
    
  } catch (err) {
    console.log(err);
    res.send("Error saving user");
  }
});

app.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({ email: username });
    
    if(!foundUser){
      console.log("User not found");
      res.send("User not found");
    } else {
      if(foundUser.password === password){
        res.render('secrets');
      } else {
        console.log("Wrong password");
        res.send("Wrong password");
      }
    }
  } catch(err) {
    console.log(err);
    res.send("Error occurred");
  }
});


app.listen(port, () => { 
  console.log(`Server running at http://localhost:${port}`)
});