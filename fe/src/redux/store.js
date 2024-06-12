import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk"

export const store = createStore(reducers,
  {},
  applyMiddleware(thunk));

// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './features/userSlice'

// export const store = configureStore({
//   reducer: {
//     user: userReducer
//   },
// })