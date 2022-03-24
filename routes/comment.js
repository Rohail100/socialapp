const router = require("express").Router();
const Post = require("../models/post");
const verify = require("./verifyToken");

//Add a Comment
router.post("/", verify, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.post,
        {
            $push: {
                comments: {
                    $each: [{ user: req.user._id, text: req.body.text }],
                    $position: 0,
                },
            },
        },
        { upsert: true },
        function (err, doc) {
            if (err) return res.send(err);
            Post.findOne(
                { _id: req.body.post },
                "comments",
                function (err, doc) {
                    if (err) return res.send(err);
                    res.json(doc.comments[0]);
                }
            ).populate("comments.user", "name");
        }
    );
});
//Delete a Comment
router.post("/delete", verify, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.post,
        {
            $pull: {
                comments: {
                    _id: req.body.id,
                },
            },
        },
        { upsert: true },
        function (err, doc) {
            if (err) return res.send(err);
            res.json(true);
        }
    );
});

//Getting comments
router.get("/:post/:length", verify, (req, res) => {
    let x;
    if (Number(req.params.length) == 0) x = 2;
    else x = 5;
    Post.findOne(
        { _id: req.params.post },
        { comments: { $slice: [Number(req.params.length), x] } },
        function (err, doc) {
            if (err) return res.send(err);
            res.json(doc.comments);
        }
    ).populate("comments.user", "name");
});

module.exports = router;
