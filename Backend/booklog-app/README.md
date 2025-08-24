# 📚 BookLog App

## **Overview**
BookLog is a simple Node.js and Express-based web app that allows users to **log books**, **add notes**, **update reviews**, and **delete entries**. It integrates with **Open Library Covers API** to display book covers dynamically based on ISBN.

---

## **Features**
✔ Add new books with title, author, rating, ISBN-13, and notes  
✔ Display book covers automatically using ISBN  
✔ Edit existing book details  
✔ Delete books from the database  
✔ Preview notes (up to 230 characters) in the book card  
✔ Full notes view with **Read Notes** button and a dedicated page  
✔ ISBN-13 validation on the server before saving  

---

## **Tech Stack**
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Template Engine:** EJS  
- **Styling:** CSS  
- **External API:** [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers)  

---

## **Setup Instructions**
1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd booklog-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up **PostgreSQL** database:
   ```sql
   CREATE TABLE books (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     author TEXT NOT NULL,
     isbn10 VARCHAR(10),
     isbn13 VARCHAR(13) NOT NULL,
     rating INTEGER,
     notes TEXT,
     finished_at DATE
   );
   ```

4. Run the server:
   ```bash
   nodemon server.js
   ```

---

## **Routes**
### **GET Routes**
- `/` → Show all books  
- `/add` → Add a new book form  
- `/edit/:id` → Edit book details  
- `/notes/:id` → View full notes of a book  

### **POST Routes**
- `/add` → Insert new book into database  
- `/edit/:id` → Update existing book details  

---

## **Database Schema**
| Column       | Type      | Description              |
|-------------|-----------|--------------------------|
| id          | SERIAL    | Primary Key            |
| title       | TEXT      | Book title             |
| author      | TEXT      | Author name            |
| isbn10      | VARCHAR   | 10-digit ISBN (optional)|
| isbn13      | VARCHAR   | 13-digit ISBN (required)|
| rating      | INTEGER   | Rating (optional)      |
| notes       | TEXT      | User's notes           |
| finished_at | DATE      | Date finished (optional)|

---

## **How Covers Work**
Book covers are fetched dynamically using Open Library API:  
```
https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg?default=false
```
Example in EJS:
```ejs
<% if (b.isbn13 || b.isbn10) { %>
  <img src="https://covers.openlibrary.org/b/isbn/<%= b.isbn13 || b.isbn10 %>-M.jpg?default=false"
       alt="Cover of <%= b.title %>" />
<% } %>
```

---

## **Future Enhancements**
- ✅ Add **search functionality**  
- ✅ Add **pagination for large book lists**  
- ✅ Allow **image upload for custom covers**  
- ✅ Implement **authentication for user-specific book logs**  
