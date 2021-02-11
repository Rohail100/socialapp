import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import user from "../api/user";
import friends from "../api/friends";

function User({ match }) {
	const [userInfo, setUserInfo] = useState({});
	const [isOwned, setOwned] = useState(true);
	const [isFollowed, setFollowed] = useState(true);
	const _id = useSelector((state) => state.userState._id);
	const isAuthenticated = useSelector(
		(state) => state.authState.isAuthenticated
	);

	useEffect(() => {
		user.getUserInfo(match.params.id).then((info) => {
			setUserInfo(info);
		});

		if (isAuthenticated) {
			if (_id !== match.params.id) setOwned(false);
			if (!isOwned) {
				friends.isFollowed(match.params.id).then((ifinthere) => {
					setFollowed(ifinthere);
				});
			}
		}
	}, [match.params.id, _id, isOwned, isAuthenticated]);

	const onClick = () => {
		friends.Follow(match.params.id).then((noerr) => {
			if (noerr) setFollowed(true);
		});
	};
	const onClick2 = () => {
		friends.unFollow(match.params.id).then((noerr) => {
			if (noerr) setFollowed(false);
		});
	};

	return (
		<div>
			<h1>User information</h1>
			<p>{userInfo.name}</p>
			<p>{userInfo.email}</p>
			{isAuthenticated && (
				<div>
					{!isOwned && (
						<div>
							{!isFollowed ? (
								<button onClick={onClick}>Follow</button>
							) : (
								<button onClick={onClick2}>unFollow</button>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
export default User;
