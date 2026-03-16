const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "data.json");

const readFile = async () => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data || "[]");
};
app.get("/", async (req, res) => {
  const data = await readFile();
  res.render("form", { data });
});

app.get("/contacts", async (req, res) => {
  let people = await readFile();
  res.json(people);
});

app.post("/contacts/register", async (req, res) => {
  const { name, email, message } = req.body;
  const data = await readFile();
  data.push({ name, email, message });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  res.status(201).send("User registered successfully");
});

app.use((req, res) => {
  res.status(404).render("error");
});

app.listen(8000);