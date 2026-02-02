const fs = require("fs");
const path = require("path");

const sourceDir = "./source";
const targetDir = "./target";

function syncDirectories(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const items = fs.readdirSync(src);

  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    try {
      if (fs.statSync(srcPath).isDirectory()) {
        syncDirectories(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    } catch (err) {
      console.log("Error syncing:", srcPath);
    }
  });
}

try {
  syncDirectories(sourceDir, targetDir);
  console.log("Synchronization completed successfully.");
} catch (err) {
  console.log("Failed to synchronize directories.");
}
