import axios from "axios";

const friends = {
	isFollowed(id) {
		return axios(`/api/friends/isfollowed/${id}`, {
			withCredentials: true,
		})
			.then(function (response) {
				// handle success
				return response.data;
			})
			.catch(function (error) {
				// handle error
				console.log(error.response.data);
			});
	},
	Follow(id) {
		return axios(`/api/friends/follow/${id}`, {
			withCredentials: true,
		})
			.then(function (response) {
				// handle success
				return response.data;
			})
			.catch(function (error) {
				// handle error
				console.log(error.response.data);
			});
	},
	unFollow(id) {
		return axios(`/api/friends/unfollow/${id}`, {
			withCredentials: true,
		})
			.then(function (response) {
				// handle success
				return response.data;
			})
			.catch(function (error) {
				// handle error
				console.log(error.response.data);
			});
	},
	getSuggestions() {
		return axios("/api/friends/suggestions", {
			withCredentials: true,
		})
			.then(function (response) {
				// handle success
				return response.data;
			})
			.catch(function (error) {
				// handle error
				console.log(error.response.data);
			});
	}
};
export default friends;
