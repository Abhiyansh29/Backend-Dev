const fs = require("fs");
const readline = require("readline");

const logFile = "app.log";

let totalLines = 0;
let errorCount = 0;
let warningCount = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(logFile),
  crlfDelay: Infinity
});

rl.on("line", (line) => {
  totalLines++;
  if (line.includes("ERROR")) errorCount++;
  if (line.includes("WARN")) warningCount++;
});

rl.on("close", () => {
  console.log("Log Summary Report");
  console.log("------------------");
  console.log("Total Lines :", totalLines);
  console.log("Errors      :", errorCount);
  console.log("Warnings    :", warningCount);
});
