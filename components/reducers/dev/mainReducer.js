import {USER_DATA}  from '../../actions/dev/actions'

function mainReducer(state = {
    user_data: null,

}, action) {
    switch (action.type) {
        case USER_DATA:
            return {
                ...state,
                user_data: action.user_data

            };
        default:
            return state
    }
}
export default mainReducer;