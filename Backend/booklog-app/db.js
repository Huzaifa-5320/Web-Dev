import pg from "pg";

export const db = new pg.Client({
  user: "postgres",     
  host: "localhost",
  database: "booklog",
  password: "postgresql", 
  port: 5432
});

db.connect();
