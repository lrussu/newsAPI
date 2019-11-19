import { SEARCH } from '../actions/actionTypes'

const categoryStr = 'business entertainment general health science sports technology';
const category = categoryStr.split(' ');

const initialState = {
    category: category,
    searchCategory: null,
    selectedCategory: null,
    query: null,

    news: []
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH.CATEGORY:
            return { ...state, searchCategory: action.payload }

        case SEARCH.QUERY:
            return { ...state, query: action.payload }

        default:
            return state
    }
}

export default searchReducer