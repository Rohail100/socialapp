import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import friends from "../api/friends";


function Suggestions(props) {
	const [suggestions, setSuggestions] = useState([]);
	useEffect(() => {
		friends.getSuggestions().then((data) => {
			setSuggestions(data);
		});
	}, []);

	return (
		<div>
			<h1>Suggestions</h1>
			{suggestions.map((suggestion,index) => (
				<p key={index}>
					<Link
						style={{ color: "black", textDecoration: "none" }}
						to={"/user/" + suggestion._id}
					>
						{suggestion.name}
					</Link>
				</p>
			))}
		</div>
	);
}
export default Suggestions;
