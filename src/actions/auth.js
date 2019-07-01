export const login = data => {
  return {
    type: "LOGIN",
    payload: data
  };
};

export const signup = data => {
  return {
    type: "SIGNUP",
    payload: data
  };
};

export const signout = () => {
  return {
    type: "SIGNOUT"
  };
};
