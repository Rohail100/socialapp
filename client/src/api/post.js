import axios from "axios"

const post = {
  fetch(dispatch,length,setSmv) {
    axios(
      `/api/post/fetch/${length}`,
      {withCredentials: true}
    ).then(function (response) {
      // handle success
      dispatch({type: 'FETCH_POSTS', payload: response.data})
      //see more visibility
      if(response.data.length<5)
        setSmv(false)
      else
        setSmv(true)
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
    })
  },
  post(dispatch,text) {
    axios.post(
      '/api/post',
      {text},
      {withCredentials: true}
    ).then(function (response) {
      // handle success
      dispatch({type: 'NEW_POST', payload: response.data})
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
    })
  },
  delete(_id) {
    return axios.delete(
      `/api/post/${_id}`,
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
  likes(_id) {
    return axios(
      `/api/post/like?post=${_id}`,
      {withCredentials: true}
    ).then(function (response) {
      // handle success
      return response.data
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
    })
  }
  ,
  isLiked(_id) {
    return axios(
      `/api/post/like/isLiked?post=${_id}`,
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
  like(post) {
    axios.post(
      '/api/post/like',
      {post},
      {withCredentials: true}
    ).then(function (response) {
      // handle success
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
    })
  },
  unlike(post) {
    axios.put(
      '/api/post/like',
      {post},
      {withCredentials: true}
    ).then(function (response) {
      // handle success
    })
    .catch(function (error) {
      // handle error
      console.log(error.response.data);
    })
  }
}
export default post