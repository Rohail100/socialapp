const router = require("express").Router();
const Post = require("../models/post");
const verify = require("./verifyToken");

//Add a like
router.post("/", verify, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.post,
        { $push: { likes: req.user._id } },
        { upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.end();
            }
        }
    );
});

//remove a like
router.put("/", verify, (req, res) => {
    Post.findByIdAndUpdate(
        req.body.post,
        { $pull: { likes: req.user._id } },
        { upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.end();
            }
        }
    );
});
// Get no of likes
router.get("/", verify, (req, res) => {
    Post.findOne(
        { _id: req.query.post },
        'likes',
        function (err, doc) {
            if (err) return res.send(err);
            res.json(doc.likes.length);
        }
    );
})
// Is the post liked
router.get("/isLiked", verify, (req, res) => {
    Post.findOne(
        { _id: req.query.post },
        'likes',
        function (err, doc) {
            if (err) return res.send(err);
            res.json(doc.likes.includes(req.user._id));
        }
    );
})

module.exports = router;
