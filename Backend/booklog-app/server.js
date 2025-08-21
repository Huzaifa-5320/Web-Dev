import express from "express";
import { db } from "./db.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

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

const port = 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
