const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const cookieParser = require("cookie-parser");

// Home Page
router.get("/", async (req, res) => {
  const locals = {
    title: "NodeJS Blog",
    description:
      "A Blog template application that will be used for your own use.",
  };

  try {
    const data = await Post.find().sort({ title: "desc" });
    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

// get post by ID

module.exports = router;
