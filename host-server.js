require("dotenv").config();

const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const app = express();
const PORT = 4000;

const connectDB = require("./server/config/db");
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(expressLayouts);
app.use(express.static("public"));
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
