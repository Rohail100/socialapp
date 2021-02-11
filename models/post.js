const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    text: {
        type: String,
        required: true,
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
    comments: [
        {
            user: { type: mongoose.Schema.ObjectId, ref: "user" },
            text: { type: String },
            date: { type: Date, default: Date.now },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("post", postSchema);
