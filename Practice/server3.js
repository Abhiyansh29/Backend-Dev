const express = require("express");
const fs = require("fs").promises;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const readStudentsFromFile = async () => {
    try {
        const data = await fs.readFile("./students.json", "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const saveStudentsToFile = async (students) => {
    await fs.writeFile(
        "./students.json",
        JSON.stringify(students, null, 2)
    );
};

app.get("/", async (req, res) => {
    const allSTudents = await readStudentsFromFile();
    res.render("form", { allSTudents });
});


app.post("/students/register", async (req, res) => {
    const { name, branch } = req.body;

    const students = await readStudentsFromFile();

    students.push({ name, branch });

    await saveStudentsToFile(students);

    res.redirect("/");
});

app.listen(3000, () =>
    console.log("Server running at http://localhost:3000")
);