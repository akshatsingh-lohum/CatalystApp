const express = require("express");
const routes = require("./src/api/routes");

const app = express();

app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Server is working well!" });
});

// Use the automatically loaded routes
app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}. Local URL: http://localhost:${PORT}`
  );
});
