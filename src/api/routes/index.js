const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

function loadRoutesRecursively(dir, baseRoute = "") {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively load routes from subdirectories
      loadRoutesRecursively(filePath, `${baseRoute}/${file}`);
    } else if (file.endsWith("Routes.js")) {
      const route = require(filePath);
      const routeName = file.split("Routes.js")[0].toLowerCase();
      let fullPath = `${baseRoute}/${routeName}`.replace(/\/+/g, "/");

      // Remove leading '/api' if it exists
      fullPath = fullPath.replace(/^\/api/, "");

      if (typeof route === "function") {
        router.use(fullPath, route);
      } else if (route && typeof route.router === "function") {
        router.use(fullPath, route.router);
      } else {
        console.warn(`Warning: ${file} does not export a valid router`);
      }

      console.log(`Loaded route: ${fullPath}`);
    }
  });
}

const routesPath = __dirname;
loadRoutesRecursively(routesPath);

module.exports = router;
