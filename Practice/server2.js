const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, "students.json");



const readStudents = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};


const writeStudents = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});



app.post("/students/register", (req, res) => {
  const { name, branch } = req.body;

  
  const students = readStudents();

  const newStudent = {
    id: Date.now(),
    name,
    branch
  };

  
  students.push(newStudent);


  writeStudents(students);

  console.log("Student saved:", newStudent);

  res.send("Student Registered Successfully ✅");
});



app.get("/students", (req, res) => {
  const students = readStudents();
  res.json(students);
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// add data to students.json from form.html
