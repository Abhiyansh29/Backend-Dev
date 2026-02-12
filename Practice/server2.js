const express = require("express");

const app = express();

const PORT = 5000;

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});

app.post("/students/register", (req, res) => {
  console.log(req.body);

  res.send("Register");
});

app.listen(PORT, () => {
  console.log("Server is running");
});