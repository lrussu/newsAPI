import { CATEGORY } from './actionTypes'

export const setCategory = item => ({
    type: CATEGORY.SET,
    payload: item,
})
