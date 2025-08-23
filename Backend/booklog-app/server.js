import express from "express";
import { db } from "./db.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM books ORDER BY rating DESC NULLS LAST"
    );
    res.render("books-index", { books: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).send("Book not found");
    res.render("book-edit", { book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn10, isbn13, rating, summary, notes, finished_at } = req.body;

  try {
    await db.query(
      `UPDATE books 
       SET title = $1,
           author = $2,
           isbn10 = $3,
           isbn13 = $4,
           rating = $5,
           summary = $6,
           notes = $7,
           finished_at = $8
       WHERE id = $9`,
      [
        title,
        author,
        isbn10 || null,
        isbn13 || null,
        rating || null,
        summary || null,
        notes || null,
        finished_at || null,
        id
      ]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/add", (req, res) => {
  res.render("books-add");
});

app.post("/add", async (req, res) => {
  const { title, author, isbn10, isbn13, rating, summary, notes, finished_at } = req.body;

  try {
    await db.query(
      `INSERT INTO books (title, author, isbn10, isbn13, rating, summary, notes, finished_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [title, author, isbn10 || null, isbn13 || null, rating || null, summary || null, notes || null, finished_at || null]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error while adding book");
  }
});




const port = 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
