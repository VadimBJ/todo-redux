import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import todoReducer from "./features/todo/todoReducer";

const store = createStore(
  combineReducers({
    todo: todoReducer,
  }),
  composeWithDevTools()
);

export default store;

export type RootState = ReturnType<typeof store.getState>;
