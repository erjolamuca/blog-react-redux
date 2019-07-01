import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/authReducer";

const reducers = combineReducers({
  auth: authReducer
});

const store = createStore(
  reducers,
  {
    auth: {
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user")
    }
  },
  applyMiddleware(thunk)
);

export default store;
