import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Comments from "./comment/Comments";
import postapi from "../../../api/post";
import heart from "./heart.svg";
import { ReactSVG } from "react-svg";

export default function Post({ post }) {
	const [likes, setlikes] = useState();
	const [isLiked, setliked] = useState();
	const [isOwned, setOwned] = useState();
	const currentUsr = useSelector((state) => state.userState._id);
	const posts = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	const date =  new Date(post.date)

	useEffect(() => {
		postapi.likes(post._id).then((data) => {
			setlikes(data);
		});
		postapi.isLiked(post._id).then((data) => {
			setliked(data);
		});
		if (currentUsr === post.user._id) setOwned(true);
		else setOwned(false);
	}, [post, currentUsr]);

	const heartstyle = {
		fill: isLiked ? "blue" : "",
		marginTop: "8%",
		marginRight: "2px",
		width: "14px",
		float: "left",
	};
	const btnstyle = {
		color: isLiked ? "blue" : "",
		padding: "0%",
		cursor: "pointer",
	};
	const btnstyle2 = {
		cursor: "pointer",
	};

	const onClick = () => {
		if (!isLiked) {
			postapi.like(post._id);
			setlikes(likes + 1);
		} else {
			postapi.unlike(post._id);
			setlikes(likes - 1);
		}
		setliked(!isLiked);
	};
	const onClick2 = () => {
		postapi.delete(post._id).then((data) => {
			if (data) {
				let index = posts.findIndex((pst) => pst._id === post._id);
				posts.splice(index, 1);
				dispatch({ type: "DEL_POST", payload: posts });
			}
		});
	};
	return (
		<div style={css}>
			<Link style={linkStyle} to={"/user/" + post.user._id}>
				<h3 style={name}>{post.user.name}</h3>
			</Link>
			<p style={dateText}>{date.toDateString()}</p>
			<p style={text}>{post.text}</p>
			<button onClick={onClick} style={btnstyle}>
				<ReactSVG style={heartstyle} src={heart} /> {likes}
			</button>
			{isOwned && (
				<button onClick={onClick2} style={btnstyle2}>
					delete
				</button>
			)}
			<Comments _id={post._id} />
		</div>
	);
}
const css = {
	padding: "10px",
	backgroundColor: "#f2f5f7",
	marginTop: "5px"
};
const text = {
	fontWeight: "300",
	margin: "0",
	marginLeft: "2px",
};
const dateText = {
	fontSize: "9px",
	fontWeight: "200",
	margin: "0",
	marginLeft: "2px",
};
const name = {
	color: "black",
	margin: "0",
	marginBottom: "2px",
};
const linkStyle = {
	textDecoration: "none",
};
