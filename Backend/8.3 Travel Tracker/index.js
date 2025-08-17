import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgresql",
  port: 5432,
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
  
}

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisited();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  //Write your code here.
    const country = req.body.country;

    try{
      const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' ||  $1 || '%';",[country.toLowerCase()]);

      const data = result.rows[0];
      const code = data.country_code;
      try{
        await db.query(
          "INSERT INTO visited_countries (country_code) VALUES ($1)",
          [code]
        );  
        res.redirect("/");
      }catch (err) {
        console.log(err);
        const countries = await checkVisited();
        return res.render("index.ejs", {
          countries: countries,
          total: countries.length,
          error: "Country has already been added, try again.",
        });
      }
    } catch (error) {
      console.log( error);
      const countries = await checkVisited();
      return res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country does not exist, try again.",
      });
    }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
