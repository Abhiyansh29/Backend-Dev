const express = require("express");
const url = require("url");
const path = require("path");
const fs = require("fs").promises;
const app = express();

const filePath = path.join(__dirname, "data.json");

const loggerFile = async (req, res, next) => {
  const logFile = path.join(__dirname, "activity.log");
  try {
    const log = `Request at: ${new Date().toLocaleDateString()} | Method: ${req.method}\n`;
    await fs.appendFile(logFile, log, "utf-8");
    next();
  } catch (err) {
    console.log("Error occured");
    next();
  }
};

const readFile = async (req, res) => {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data || "[]");
};

app.get("/peoples", loggerFile, async (req, res) => {
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
