const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect("/gallery");
});

app.get("/gallery", async (req, res) => {
  const filePath = path.join(__dirname, "public/images");
  const files = await fs.readdir(filePath);
  const images = files.map((f) => "images/" + f);
  res.render("gallery", { images });
});

app.listen(8000);
