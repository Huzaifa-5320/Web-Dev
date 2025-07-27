import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const d = new Date();
    const day = d.getDay();
    // console.log(day);

    if(day === 0 || day === 6) {
        // Sunday or Saturday
        res.render("index.ejs", { 
            dayType: "a weekend", 
            advice: "it's time to have some fun"
        });
    } else {
        res.render("index.ejs", { 
        dayType: "a weekday", 
        advice: "it's time to work hard"
        });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
}); 