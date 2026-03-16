const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "posts.json");

const readFile = async () => {
  try {
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

app.get("/", async (req, res) => {
  const posts = await readFile();
  res.render("list", { posts });
});

app.get("/new", (req, res) => {
  res.render("blog");
});

app.post("/create", async (req, res) => {
  const { title, content } = req.body;
  try {
    const data = await fs.readFile(filePath);
    const posts = JSON.parse(data);
    posts.push({ id: posts.length + 1, title, content });
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving post");
  }
});

app.get("/posts/:id", async (req, res) => {
  const posts = await readFile();
  const post = posts.find((post) => post.id === Number(req.params.id));
  res.render("post", { post });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
