import { combineReducers } from "redux";
import authReducer from "./authReducer"
import changeReducer from "./changeReducer"

const reducers = combineReducers({
    auth: authReducer,
    change: changeReducer
});

export default reducers;