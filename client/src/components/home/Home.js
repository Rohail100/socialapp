import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddPost from "./AddPost";
import Posts from "./Posts";
import LoginForm from "../LoginForm";

function Home(props) {
	const isAuthenticated = useSelector(
		(state) => state.authState.isAuthenticated
	);

	if (!isAuthenticated) return <LoginForm />;

	return (
		<div>
		<p className="sugg"><Link style={linkStyle} to="/suggestions">suggessions</Link></p>
			<AddPost />
			<Posts />
		</div>
	);
}
const linkStyle = {
  color: "black",
  textDecoration: "none",
  backgroundColor: "#f2f5f7",
  padding: "5px",
  border: "1px solid",
  borderRadius: "15px"
};
export default Home;
