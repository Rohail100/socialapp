import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function User(props) {
	const [query, setQuery] = useState("");
	const history = useHistory();
	const handleSubmit = (e) => {
		e.preventDefault();
		// window.location.href = `/search/${query}`;
		history.push(`/search/${query}`);
	};
	const onChange = (e) => {
		setQuery(e.target.value);
	};

	return (
		<form style={formStyle} onSubmit={handleSubmit}>
			<input
				style={{ width: "55%" }}
				type="text"
				name="query"
				className="input"
				value={query}
				onChange={onChange}
			/>
			<input style={btnStyle} type="submit" value="Search" />
		</form>
	);
}

const btnStyle = {
	fontSize: "16px",
	cursor: "pointer",
	marginLeft: "1px",
};

const formStyle = {
	width: "300px",
};

export default User;
