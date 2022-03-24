import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";
import commentapi from "../../../../api/comment";
function Comments({ _id }) {
    const [comments, setcomments] = useState([]);
    //see more visibility
    const [smv, setSmv] = useState(false);
    useEffect(() => {
        commentapi.fetch(_id, 0).then((data) => {
            setcomments(data);
            //see more visibility
            if (data.length < 2) setSmv(false);
            else setSmv(true);
        });
    }, [_id]);
    const addcomment = (text) => {
        commentapi.post(_id, text).then((data) => {
            setcomments([data, ...comments]);
        });
    };
    const delcomment = (id) => {
        commentapi.delete(_id, id).then((data) => {
            if (data) {
                const remainder = comments.filter((cmt) => {
                    return cmt._id !== id;
                });
                setcomments(remainder);
            }
        });
    };
    const onClick = (e) => {
        commentapi.fetch(_id, comments.length).then((data) => {
            setcomments([...comments, ...data]);
            //see more visibility
            if (data.length < 5) setSmv(false);
            else setSmv(true);
        });
    };

    return (
        <div>
            <AddComment post={_id} addcomment={addcomment} />
            {comments.map((comment, index) => (
                <Comment
                    key={index}
                    comment={comment}
                    delcomment={delcomment}
                />
            ))}
            {smv && (
                <p style={seemorestyle} onClick={onClick}>
                    See More Comment
                </p>
            )}
        </div>
    );
}
const seemorestyle = {
    cursor: "pointer",
    margin: "0",
    fontSize: "12px",
};

export default Comments;
