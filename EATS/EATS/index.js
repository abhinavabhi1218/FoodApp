const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require('cors')

var corsOptions = {origin: "http://localhost:3000"};
connectDb();
const app = express();
app.use(cors(corsOptions))
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin", require("./routes/AdminRoutes"));
app.use("/", require("./routes/QrRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




