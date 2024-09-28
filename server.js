const express = require("express");
const cors = require("cors");
const publicRoutes = require("./src/api/routes/publicRoutes");
const protectedRoutes = require("./src/api/routes/protectedRoutes");
const authMiddleware = require("./middleware/AuthMiddleware");
const app = express();

require("dotenv").config();

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

// Public routes
app.use("/", publicRoutes);

// Apply auth middleware to protected routes
app.use(authMiddleware);

// Protected routes
app.use("/", protectedRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}. Local URL: http://localhost:${PORT}`
  );
});
