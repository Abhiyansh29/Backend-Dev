// const express=require("express");

// const app=express();
// app.use(express.json());
// const PORT =8000;
// app.get("/",(req,res)=>{
//     res.send("Welcome to home page")
// })

// app.get("/users",(req,res)=>{
//     res.send("<h1>this is users page</h1> ")
// })
// const students=[
//     {id:1,name:"Alice", branch:"CS"},
//     {id:2,name:"Abhi", branch:"ECE"},
//     {id:3,name:"Abhiyansh", branch:"Ec"},
//     {id:4,name:"Priyansh", branch:"Cyber"}

// ]
// app.get("/users/:id",(req,res)=>{
//     const userId=req.params.id
//     res.send(`You are requesting for User Id:${userId}`)
// })
// app.get("/students/search",(req,res)=>{
//     const branch=req.query.branch;
//     console.log("branch",branch);
//     if(!branch){
//         return res.json(students);
//     }
//     const foundStudents=students.filter(s=>s.branch==branch);
//     res.json(foundStudents);

// })


    

// app.get("/students/:id",(req,res)=>{
//     const id =req.params.id;

//     const arrayIndex=students.findIndex(s=>s.id==id);
//     if(arrayIndex<0){
//         return res.status(404).send("Student not found");
//     }

//     const data =students[arrayIndex];
//     res.json(data);




// })
// app.get("/students",(req,res)=>{
//     return res.json(students);
// })
// app.post("/students/register",(req,res)=>{
//     const { id, name, branch } = req.body;

    
//     if (!id || !name || !branch) {
//         if(!id){
//             return res.status(400).send("Please provide id")
//         }
//         else if(!name){
//             return res.status(400).send("Please provide name")
//         }
//         else{
//             return res.status(400).send("please provide branch")
//         }

//     }

//     const existStudent = students.find(s => s.id == id);

//     if (existStudent) {
//         return res.status(409).send(`Student with ID ${id} already exists`)
//     }
//     const newStudent = { id, name, branch };
//     students.push(newStudent)

//     res.json(students);

// })


// app.listen(PORT,()=>{
//     console.log(`Server is Running on port:${PORT}`)
// })

// second code


// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// app.use(express.json());

// const PORT = 8000;


// const filePath = path.join(__dirname, "students.json");

// const readFromFile = () => {
//     const data = fs.readFileSync(filePath, "utf-8");
//     return data ? JSON.parse(data) : [];
// };


// const writeToFile = (data) => {
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// };



// app.get("/", (req, res) => {
//     res.send("Welcome to home page");
// });

// app.get("/users", (req, res) => {
//     res.send("<h1>This is users page</h1>");
// });


// const students = [
//     { id: 1, name: "Alice", branch: "CS" },
//     { id: 2, name: "Abhi", branch: "ECE" },
//     { id: 3, name: "Abhiyansh", branch: "Ec" },
//     { id: 4, name: "Priyansh", branch: "Cyber" }
// ];


// app.get("/users/:id", (req, res) => {
//     const userId = req.params.id;
//     res.send(`You are requesting for User Id: ${userId}`);
// });


// app.get("/students/search", (req, res) => {
//     const branch = req.query.branch;

//     if (!branch) {
//         return res.json(students);
//     }

//     const foundStudents = students.filter(s => s.branch == branch);
//     res.json(foundStudents);
// });


// app.get("/students/:id", (req, res) => {
//     const id = req.params.id;

//     const arrayIndex = students.findIndex(s => s.id == id);
//     if (arrayIndex < 0) {
//         return res.status(404).send("Student not found");
//     }

//     res.json(students[arrayIndex]);
// });


// app.get("/students", (req, res) => {
    
//     res.json(students);
// });


// app.post("/students/register", (req, res) => {
//     const { id, name, branch } = req.body;

//     if (!id || !name || !branch) {
//         if (!id) return res.status(400).send("Please provide id");
//         if (!name) return res.status(400).send("Please provide name");
//         return res.status(400).send("Please provide branch");
//     }

    
//     const studentsFromFile = readFromFile();

//     const existStudent = studentsFromFile.find(s => s.id == id);
//     if (existStudent) {
//         return res.status(409).send(`Student with ID ${id} already exists`);
//     }

//     const newStudent = { id, name, branch };


//     studentsFromFile.push(newStudent);
//     writeToFile(studentsFromFile);


//     students.push(newStudent);

//     res.status(201).json(newStudent);
// });



// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = 8000;

// File path
const filePath = path.join(__dirname, "students.json");

// Safe read from file
const readFromFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
        return [];
    }

    const data = fs.readFileSync(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
};

// Write to file
const writeToFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to home page");
});

// Get all students (from file)
app.get("/students", (req, res) => {
    const students = readFromFile();
    res.json(students);
});

// Get student by ID
app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    const students = readFromFile();

    const student = students.find(s => s.id == id);
    if (!student) {
        return res.status(404).send("Student not found");
    }

    res.json(student);
});

// Search students by branch
app.get("/students/search", (req, res) => {
    const branch = req.query.branch;
    const students = readFromFile();

    if (!branch) {
        return res.json(students);
    }

    const filtered = students.filter(s => s.branch === branch);
    res.json(filtered);
});

// Register new student (permanent save)
app.post("/students/register", (req, res) => {
    const { id, name, branch } = req.body;

    if (!id || !name || !branch) {
        return res.status(400).send("Please provide id, name and branch");
    }

    const students = readFromFile();

    const exists = students.find(s => s.id == id);
    if (exists) {
        return res.status(409).send(`Student with ID ${id} already exists`);
    }

    const newStudent = { id, name, branch };
    students.push(newStudent);
    writeToFile(students);

    res.status(201).json({
        message: "Student saved permanently",
        student: newStudent
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});                                                         

