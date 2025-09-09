const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs Blog",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    let perPage = 3;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { title: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    // Count is deprecated - please use countDocuments({}) instead
    // const count = await Post.count();
    const count = await Post.countDocuments({});
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasNextPagePlus = nextPage <= Math.ceil(count * perPage);

    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prevPage: hasNextPagePlus ? page - 1 : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// get post by id
router.get("/post/:id", async (req, res) => {
  try {
    const slug = req.params.id;
    const data = await Post.findById(slug);

    if (!data) {
      return res.status(404).send("Post not found");
    }

    const locals = {
      title: data.title,
      description:
        "A Blog template application that will be used for your own use.",
    };

    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// search

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "A blog template made with NodeJS and ExpressJS",
    };

    let searchTerm = req.body.searchTerm || "";
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", { locals, data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
