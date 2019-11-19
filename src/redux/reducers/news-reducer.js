import { NEWS } from '../actions/actionTypes'

const initialState = {
    news: []
}

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEWS.FETCH_SUCCESS:
            console.log("newsReducer")
            return { ...state, news: action.payload }
        default:
            return state
    }
}

export default newsReducer