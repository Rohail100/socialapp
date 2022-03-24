export default function (state = [], action) {
  switch (action.type) {
    case 'FETCH_POSTS':
      return [
        ...state,
        ...action.payload
      ];
    case 'NEW_POST':
      return [action.payload, ...state];
    case 'DEL_POST':
      return [...action.payload];
    case 'RESET_POST':
      return [];
    default:
      return state;
  }
}
