const userState = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, action.payload)
    case 'RESET_USER':
      return Object.assign({}, {})
    default:
      return state
  }
}
 
 export default userState;