//starts the server, connects DB, loads middleware, register routes

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");// allow frontend to talk to backend

const connectDB = require("./config/db");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());//makes cookies available as req.cookies

connectDB();

app.use("/api/auth", require("./routes/auth.routes"));//all authentication routes
app.use("/api/admin", require("./routes/admin.routes"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});//start the server on give port
