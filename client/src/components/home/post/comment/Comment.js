import React, {useState,useEffect} from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

function Comment({ comment,delcomment }) {
	const [isOwned, setOwned] = useState();
	const currentUsr = useSelector((state) => state.userState._id);
	const date = new Date(comment.date);
	const onClick = e => {
		delcomment(comment._id)
	}
	useEffect(() => {
		if (currentUsr === comment.user._id) setOwned(true);
		else setOwned(false);
	}, [comment, currentUsr]);

	return (
		<div style={comments}>
			<div style={{ display: "flex" }}>
				<Link style={linkStyle} to={"/user/" + comment.user._id}>
					<p style={name}>{comment.user.name}</p>
				</Link>
				{isOwned && <p style={deltext} onClick={onClick}>delete</p>}
			</div>
			<p style={dateText}>{date.toDateString()}</p>
			<p style={text}>{comment.text}</p>
		</div>
	);
}
const name = {
	color: "black",
	fontSize: "13px",
	fontWeight: "700",
	margin: "0",
};
const text = {
	fontSize: "13px",
	fontWeight: "300",
	margin: "0",
	marginLeft: "2px",
};
const dateText = {
	fontSize: "7px",
	fontWeight: "600",
	margin: "0",
	marginLeft: "2px",
};
const deltext = {
	fontSize: "7px",
	fontWeight: "600",
	margin: "0",
	marginLeft: "2px",
	alignSelf: "flex-end",
	cursor: "pointer"
};
const comments = {
	paddingLeft: "10px",
};
const linkStyle = {
	textDecoration: "none",
};
export default Comment;
