import axios from "axios"

const user = {
	isAuthenticated() {
		return axios(
      '/api/user/isAuthenticated',
      {withCredentials: true}
    ).then(function (response) {
      // handle success
      return response.data;
    })
    .catch(function (error) {
      // handle error
      return false
    })
  },
  getUser(dispatch) {
    axios(
      '/api/user/getUser',
      {withCredentials: true}
    ).then(function (response) {
      // handle success
      dispatch({type: 'SET_USER', payload: response.data})
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
    })
  },
  getUserInfo(id) {
    return axios(
      `/api/user/getUserInfo/${id}`,
      {withCredentials: true}
    ).then(function (response) {
      // handle success
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
    })
  },
  search(query) {
    return axios(
      `/api/user/search/${query}`,
      {withCredentials: true}
    ).then(function (response) {
      // handle success
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
    })
  },

  login(dispatch, user) {
     axios.post(
      '/api/user/login',user,
      {withCredentials: true}
    ).then(function (response) {
      // handle success
      dispatch({type: 'LOGIN_SUCCESS'})
      dispatch({type: 'SET_USER', payload: response.data})
    })
    .catch(function (error) {
      // handle error
      dispatch({type: 'LOGIN_FAILURE', message: error.response.data})      
    })
  },
  register(dispatch, user) {
    return axios.post(
      '/api/user/register',user,
      {withCredentials: true}
    ).then(function (response) {
      // handle success
      dispatch({type: 'LOGIN_SUCCESS'})
      dispatch({type: 'SET_USER', payload: response.data})
      return ""
    })
    .catch(function (error) {
      // handle error
      return error.response.data
    })
  },
  logout(dispatch) {
    axios(
      '/api/user/logout',
      {withCredentials: true}
    ).then(function (response) {
      // handle success
      dispatch({type: 'LOGOUT_SUCCESS'})
      dispatch({type: 'RESET_USER'})
      dispatch({type: 'RESET_POST'})
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
    })
  }
}
export default user