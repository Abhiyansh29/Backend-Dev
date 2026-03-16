const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;
const dataFile = path.join(__dirname, "data.json");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Helper functions
const readData = () => {
  try {
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return { books: [], authors: [] };
  }
};

const writeData = (data) => {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// Validation Middleware
const validateYear = (req, res, next) => {
  const { year } = req.query;
  if (year) {
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();
    if (isNaN(yearNum) || yearNum < 1000 || yearNum > currentYear) {
      return res.status(400).json({ error: "Invalid year." });
    }
  }
  next();
};

// GET /books - Render EJS
app.get("/books", validateYear, (req, res) => {
  let { author, year, page, limit, title } = req.query;
  const data = readData();
  let filteredBooks = data.books;

  if (author)
    filteredBooks = filteredBooks.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase()),
    );
  if (year)
    filteredBooks = filteredBooks.filter((b) => b.year === parseInt(year));
  if (title)
    filteredBooks = filteredBooks.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase()),
    );

  let pagination = null;
  if (page && limit) {
    page = parseInt(page);
    limit = parseInt(limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalBooks = filteredBooks.length;

    pagination = {
      totalEntry: totalBooks,
      results: filteredBooks.slice(startIndex, endIndex),
      previous: startIndex > 0 ? { page: page - 1, limit } : null,
      next: endIndex < totalBooks ? { page: page + 1, limit } : null,
    };
    filteredBooks = pagination.results;
  }

  res.render("index", { books: filteredBooks, pagination });
});

// Authors CRUD
app.post("/authors", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });

  const data = readData();
  const newAuthor = { id: data.authors.length + 1, name };
  data.authors.push(newAuthor);
  writeData(data);

  res.status(201).json(newAuthor);
});

app.get("/authors", (req, res) => {
  const data = readData();
  res.json(data.authors);
});

app.get("/authors/:id", (req, res) => {
  const data = readData();
  const author = data.authors.find((a) => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ error: "Not found" });
  res.json(author);
});

app.put("/authors/:id", (req, res) => {
  const data = readData();
  const author = data.authors.find((a) => a.id === parseInt(req.params.id));
  if (!author) return res.status(404).json({ error: "Not found" });

  if (req.body.name) author.name = req.body.name;
  writeData(data);
  res.json(author);
});

app.delete("/authors/:id", (req, res) => {
  const data = readData();
  const index = data.authors.findIndex((a) => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Not found" });

  const deleted = data.authors.splice(index, 1);
  writeData(data);
  res.json(deleted[0]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
