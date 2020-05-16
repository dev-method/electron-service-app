import {createStore} from 'redux'
import mainReducer from '../../reducers/dev/mainReducer'

const store=createStore(mainReducer);
export default store;