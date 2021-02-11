const router = require("express").Router();
const User = require("../models/user");
const verify = require("./verifyToken");

//Follow a User
router.get("/follow/:id", verify, (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        { $push: { friends: req.params.id } },
        { upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.json(true);
            }
        }
    );
});

//unfollow a User
router.get("/unfollow/:id", verify, (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        { $pull: { friends: req.params.id } },
        { upsert: true },
        function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.json(true);
            }
        }
    );
});

//check if friend is in the list

router.get("/isfollowed/:id", verify, (req, res) => {
    User.findOne({ _id: req.user._id },'friends', (err, user) => {
        let isInArray = user.friends.some(function (friend) {
        return friend.equals(req.params.id);
    });
    res.send(isInArray)    
})
});
// Get friends of friends
router.get("/suggestions", verify, (req, res) => {
    User.findOne({ _id: req.user._id }, "friends", (err, user) => {
        let fof = []
        user.friends.forEach((friend,index)=>{
            fof = [...fof,...friend.friends]
        })
        let fof2 = fof.filter((item, pos) => {
            return fof.indexOf(item) == pos;
        })
        user.friends.unshift(req.user._id)        
        let fof3 = fof2.filter((item, pos) => {
            const found = user.friends.find(element => element._id.equals(item._id) )
            return !found
        })
        res.json(fof3)
    }).populate({
            path: 'friends',
            select: 'name friends',
            populate: {
                path: 'friends',
                select: 'name'
            }
        })
});


module.exports = router;
