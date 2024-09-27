const express = require("express");
const cors = require("cors");
const routes = require("./src/api/routes");

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://voltfleet.in",
    process.env.FRONTEND_URL,
  ],
  optionsSuccessStatus: 200,
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Server is working well!" });
});

// Use the automatically loaded routes
app.use("/", routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}. Local URL: http://localhost:${PORT}`
  );
});
