import axios from "axios"

const comment = {
  fetch(_id,length) {
    return axios(
      `/api/post/comment/${_id}/${length}`,
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
  post(post,text) {
    return axios.post(
      '/api/post/comment',
      {post,text},
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
  delete(post,id) {
    return axios.post(
      '/api/post/comment/delete',
      {post,id},
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
}
export default comment