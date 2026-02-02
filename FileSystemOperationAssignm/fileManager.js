const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log("\n1.Read  2.Write  3.Copy  4.Delete  5.List  6.Exit");
  rl.question("Choose option: ", (choice) => {
    switch (choice) {
      case "1": readFile(); break;
      case "2": writeFile(); break;
      case "3": copyFile(); break;
      case "4": deleteFile(); break;
      case "5": listDirectory(); break;
      case "6": rl.close(); break;
      default:
        console.log("Invalid choice");
        menu();
    }
  });
}

function readFile() {
  rl.question("Enter file path: ", (filePath) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) console.log("Error:", err.message);
      else console.log("\n" + data);
      menu();
    });
  });
}

function writeFile() {
  rl.question("Enter file path: ", (filePath) => {
    rl.question("Enter content: ", (content) => {
      fs.writeFile(filePath, content, (err) => {
        if (err) console.log("Error:", err.message);
        else console.log("File written successfully");
        menu();
      });
    });
  });
}

function copyFile() {
  rl.question("Source path: ", (src) => {
    rl.question("Destination path: ", (dest) => {
      fs.copyFile(src, dest, (err) => {
        if (err) console.log("Error:", err.message);
        else console.log("File copied successfully");
        menu();
      });
    });
  });
}

function deleteFile() {
  rl.question("Enter file path: ", (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) console.log("Error:", err.message);
      else console.log("File deleted");
      menu();
    });
  });
}

function listDirectory() {
  rl.question("Enter directory path: ", (dirPath) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) console.log("Error:", err.message);
      else files.forEach(file => console.log(file));
      menu();
    });
  });
}

menu();
