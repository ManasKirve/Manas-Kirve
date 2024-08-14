const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT;
const mongoDB = require("./db");

// CORS middleware
const allowedOrigins = ["http://localhost:3000", "http://localhost:3002"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Connect to MongoDB
mongoDB();

// Middleware
app.use(express.json()); // To parse JSON bodies

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData")); // This should already include the /foodData route

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please use a different port.`);
  } else {
    console.error(`Server error: ${error}`);
  }
});
