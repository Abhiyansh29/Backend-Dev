const express = require("express");
const url = require("url");
const path = require("path");
const fs = require("fs").promises;
const app = express();

const filePath = path.join(__dirname, "data.json");

const readFile = async (req, res) => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data || "[]");
};

app.get("/peoples", async (req, res) => {
  let people = await readFile();
  let { name } = req.query;

  if (name) {
    people = people.filter((s) => {
      return s.name.toLowerCase().includes(name.toLowerCase());
    });
  }
  res.json(people);
});

app.listen(8000);
