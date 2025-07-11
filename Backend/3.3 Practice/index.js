import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

app.get('/about', (req, res) => {
    res.send("<h1>About Us</h1>");
}); 

app.get('/contact', (req, res) => {
    res.send("<h1>Contact Us</h1>");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 