const INITIAL_STATE = {
  user: null,
  token: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "SIGNUP":
      return action.payload;
    case "SIGNOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
