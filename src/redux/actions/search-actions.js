import { SEARCH } from './actionTypes'

export const searchByCategory = item => ({
    type: SEARCH.CATEGORY,
    payload: item,
})

export const searchByQuery = item => ({
    type: SEARCH.QUERY,
    payload: item,
})