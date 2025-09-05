const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const cookieParser = require("cookie-parser");

// Home Page
router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "NodeJS Blog",
      description:
        "A Blog template application that will be used for your own use.",
    };
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

// get post by ID
router.get("/post/:id", async (req, res) => {});

// search route
router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "NodeJS Blog",
      description:
        "A Blog template application that will be used for your own use.",
    };
    let searchTerm = req.body.SearchTerm;
    const searchNoSpecialChar = searchtTerm.replace(/[^a-zA-Z]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("index", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
