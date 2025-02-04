import { CATEGORY } from '../actions/actionTypes'

const initialState = {
    selectedCategory: null
}

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {

        case CATEGORY.SET:
            return { ...state, selectedCategory: action.payload }

        default:
            return state
    }
}

export default categoryReducer