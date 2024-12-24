import { combineReducers } from 'redux';
import reducerStorys from './reducerStorys';

const rootReducer = combineReducers({
    infoStorys: reducerStorys,
});
export default rootReducer;
