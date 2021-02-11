const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/post");
const like = require("./like");
const comment = require("./comment");
const verify = require("./verifyToken");

// Get all posts by friends
router.get("/fetch/:length", verify, (req, res) => {
	User.findOne({ _id: req.user._id }, "friends", (err, user) => {
		user.friends.unshift(req.user._id)
		Post.find(
			{
				user: {
					$in: user.friends,
				},
			},'user text date',
			{sort: {date: -1}, skip: Number(req.params.length) , limit: 5 },
			function (err, docs) {
				if (err) return res.send(err);
				res.json(docs);
			}
		).populate('user','name');
	});
});

//Post Submit
router.post("/", verify, (req, res) => {
	const post = new Post({
		user: req.user._id,
		text: req.body.text,
	});
	post.save((err, data) => {
		if (err) return res.send(err);
		Post.findOne({ _id: data._id },'user text date',
			function (err, doc) {
				if (err) return res.send(err);
				res.json(doc);
			}
		).populate('user','name')
	});
});

// Delete Post
router.delete('/:id', (req, res) => {
  Post.findOneAndRemove(
    { _id: req.params.id }
  )
    .then((err,docs) => {
      if(err) res.send(err)
      else res.send(true);
    })
});

//Controllers for likes and comments
router.use('/like',like)
router.use('/comment',comment)


module.exports = router;
