import { combineReducers } from "redux";
import post from "./reducers/posts/PostReducer";
import profile from "./reducers/profile/ProfileReducer";
import highlight from "./reducers/highlight/HighlightReducer";

import routesReducer from "./reducers/routes/routesReducer";
// import counterReducer from "reducers/counter/counterReducer";
import sessionReducer from "./reducers/session/sessionReducer";
import todolistReducer from "./reducers/todolist/todolistReducer";

export default combineReducers({
  routesReducer,
  post,
  profile,
  highlight,
  //   counterReducer,
  sessionReducer,
  todolistReducer
});
