import { NEWS } from '../actions/actionTypes'

const initialState = {
    // endpoint: topUrl,
    category: null,
    // country: "us",
    // q: null,
    moreNewsRequest: {
        category: null,
        q: null,
        page: 0
    },

    news: [],
    totalNews: 0,

    page: 0,
    nextPage: null,
    totalPages: 0,
    pageSize: 5,
    isLoading: false,
    error: null
}

const nextPage = (totalPages, currentPage) => totalPages > currentPage ? (currentPage + 1) : null;

const newsReducer = (state = initialState, action = {}) => {

    switch (action.type) {

        case NEWS.FETCH:
            return {
                ...state,
                isLoading: true,
                error: null,
                category: action.payload,

                page: 0,
                nextPage: null,
                news: []
            }

        case NEWS.FETCH_SUCCESS:
            let totalNews = action.payload.data.totalResults;
            let  totalPages = Math.ceil(totalNews / state.pageSize);
            let page = state.page + 1;
            return {
                ...state,
                isLoading: false,
                news: action.payload.data.articles,
                totalNews: totalNews,
                totalPages: totalPages,
                page: page,
                nextPage: nextPage(totalPages, page),

                moreNewsRequest: {
                    ...state.moreNewsRequest,
                    page: nextPage(totalPages, page),
                    category: state.category
                }
            }

        case NEWS.FETCH_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case NEWS.FETCH_MORE:
            console.log("news-reducer")
            console.log("action")
            console.log(action.type)
            console.log("payload")
            console.log(action.payload)
            let newState = {
                ...state,
                isLoading: true,
                moreNewsRequest: state.nextPage ?
                    {
                    ...state.moreNewsRequest,
                    page: nextPage(state.totalPages, state.nextPage),
                    category: state.category
                } : null,
                error: null
            }

            console.log("newState")
            console.log(newState)

            return newState

        case NEWS.FETCH_MORE_SUCCESS:
            const moreNews = action.payload.data.articles;
            const { news } = state;
            return {
                ...state,
                isLoading: false,
                news: [...news, ...moreNews],
                page: state.nextPage,
                nextPage: nextPage(state.totalPages, state.nextPage)
            }

        case NEWS.FETCH_MORE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export default newsReducer