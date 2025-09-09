const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_Secret;
const adminLayout = "../views/layouts/admin";

// get

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "A blog template made with NodeJS and ExpressJS",
    };
    res.render("admin/index", { locals, layouts: adminLayout });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
