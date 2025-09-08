const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
// Home Page
router.get("/", async (req, res) => {
  const locals = {
    title: "NodeJS Blog",
    description:
      "A Blog template application that will be used for your own use.",
  };

  try {
    const data = await Post.find().sort({ createdAt: "desc" });
    res.render("index", {
      locals,
      data,
      currentPage: page,
      nextPage: hasNextPage ? nextPage : null,
      previousPage: hasNextPagePlus ? previousPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// get post by ID
router.post("/search", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description:
        "A Blog template application that will be used for your own use.",
    };
    res.render("post", (locals, data));
  } catch (error) {
    console.log(error);
  }
});

// search
router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "A blog template made with NodeJS and ExpressJS",
    };

    let searchTerm = req.body.SerchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
