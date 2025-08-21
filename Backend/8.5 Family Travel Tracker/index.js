import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgresql",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisited(userId) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [userId]
  );
  return result.rows.map(c => c.country_code);
}


app.get("/", async (req, res) => {
  const countries = await checkVisited(currentUserId);
  const user = users.find(u => u.id === currentUserId);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: user.color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%' ORDER BY country_name ASC LIMIT 1;",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      // agar koi match hi nahi mila
      const countries = await checkVisited(currentUserId);
      return res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        error: "Country does not exist, try again.",
        color: users.find(u => u.id === currentUserId).color
      });
    }

    const countryCode = result.rows[0].country_code;

    // pehle check karo already exist to nahi
    const exists = await db.query(
      "SELECT 1 FROM visited_countries WHERE user_id=$1 AND country_code=$2",
      [currentUserId, countryCode]
    );

    if (exists.rows.length > 0) {
      const countries = await checkVisited(currentUserId);
      return res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        users: users,
        error: "Country has already been added, try again.",
        color: users.find(u => u.id === currentUserId).color
      });
    }

    // agar naya hai to insert karo
    await db.query(
      "INSERT INTO visited_countries (user_id, country_code) VALUES ($1,$2)",
      [currentUserId, countryCode]
    );

    res.redirect("/");

  } catch (err) {
    console.log(err);
    const countries = await checkVisited(currentUserId);
    return res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      error: "Something went wrong, try again.",
      color: users.find(u => u.id === currentUserId).color
    });
  }
});


app.post("/user", async (req, res) => {
  const userId = parseInt(req.body.user); // comes from form
  currentUserId = userId;

  const countries = await checkVisited(currentUserId);
  const user = users.find(u => u.id === currentUserId);

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: user.color
  });
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
