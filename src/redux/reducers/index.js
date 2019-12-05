import { combineReducers } from 'redux'
import  searchReducer from './search-reducer'
import  categoryReducer from './category-reducer'
import  newsReducer from './news-reducer'

export default combineReducers({
    initialState: searchReducer,
    selectedCategory: categoryReducer,
    searchCategory: searchReducer,
    newsReducer
})
