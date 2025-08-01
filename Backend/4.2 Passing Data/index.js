import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const firstName = req.body.fName.trim();
  const lastName = req.body.lName.trim();
  const fullName = firstName + lastName;
  const length = fullName.length;
  res.render("index.ejs", {
    length: length
  }); 
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
