import { SEARCH } from '../actions/actionTypes'


const countryStr = 'ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za';
const country = countryStr.split(' ');

const langStr = 'ar de en es fr he it nl no pt ru se ud zh';
const lang = langStr.split(' ');

const categoryStr = 'business entertainment general health science sports technology';
const category = categoryStr.split(' ');

// const initialState = {
//     country: country,
//     category: category,
//     lang: lang,
//     news: []
// }

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
            console.log("searchReducer by category")
            return { ...state, searchCategory: action.payload }

        case SEARCH.QUERY:
            console.log("searchReducer by query")
            return { ...state, query: action.payload }
        default:
            return state
    }
}

export default searchReducer