import { NEWS } from './actionTypes'


// Action creators

export const fetchNews = payload => ({ type: NEWS.FETCH, payload })

export const fetchNewsSucceed = payload => ({ type: NEWS.FETCH_SUCCESS, payload })

// export const fetchedNews = payload => ({ type: NEWS.FETCH_SUCCESS, payload })

export const fetchNewsFailed = payload => ({ type: NEWS.FETCH_FAIL, payload })


export const prepareMoreNewsRequest = () => ({ type: NEWS.FETCH_MORE_PREPARE })

export const fetchMoreNews = payload => {
    console.log("action creator fetchMoreNews")
    console.log(payload)
    return ({ type: NEWS.FETCH_MORE, payload })
}

export const fetchMoreNewsSucceed = payload => ({ type: NEWS.FETCH_MORE_SUCCESS, payload })

export const fetchMoreNewsFailed = payload => ({ type: NEWS.FETCH_MORE_FAIL, payload })