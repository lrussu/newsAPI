import { NEWS } from './actionTypes'

export const fetchedNews = item => ({
    type: NEWS.FETCH_SUCCESS,
    payload: item,
})