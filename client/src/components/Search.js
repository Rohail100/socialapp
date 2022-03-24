import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import user from "../api/user";

function Search({ match }) {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		user.search(match.params.query).then((result) => {
			setUsers(result);
		});
	}, [match.params.query]);

	return (
		<div>
			<h3>Search Result for "{match.params.query}"</h3>
			{users.map((user,index) => (
				<p key={index}>
					<Link
						style={{ color: "black", textDecoration: "none" }}
						to={"/user/" + user._id}
					>
						{user.name}
					</Link>
				</p>
			))}
		</div>
	);
}
export default Search;
