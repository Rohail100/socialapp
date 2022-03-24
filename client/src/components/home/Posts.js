import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "./post/Post";
import post from "../../api/post";

function Posts(props) {
    const dispatch = useDispatch();
    //see more visibility
    const [smv, setSmv] = useState(true);
    useEffect(() => {
        if (localStorage.getItem("fetched") === "false") {
            post.fetch(dispatch, 0, setSmv);
            localStorage.setItem("fetched", true);
        }
    }, [dispatch]);
    const posts = useSelector((state) => state.posts);
    const onClick = (e) => {
        post.fetch(dispatch, posts.length, setSmv);
    };

    return (
        <div>
            {posts.map((post, index) => (
                <Post key={index} post={post} />
            ))}
            {smv && (
                <p style={seemorestyle} onClick={onClick}>
                    See More Post
                </p>
            )}
        </div>
    );
}
const seemorestyle = {
    cursor: "pointer",
};
window.onload = () => {
    localStorage.setItem("fetched", false);
};

export default Posts;
