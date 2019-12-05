import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import {fetchMoreNewsSucceed, fetchMoreNewsFailed, fetchNewsSucceed, fetchNewsFailed} from "../actions/news-actions";
import { NEWS } from '../actions/actionTypes'
import axios from "axios";

const apiUrl = 'https://newsapi.org/v2/';
const apiKey = 'apiKey=4e9b7b6204a74011856b2b966027895d';
const countryArg = 'country=us';

const pageSize = 5;
const pageSizeArg = `pageSize=${pageSize}`
const topUrl = `${apiUrl}top-headlines?${apiKey}&${countryArg}&${pageSizeArg}`;
const everyUrl = `${apiUrl}everything?${apiKey}`;

function fetchNews(category = 'sports') {
    const categoryArg = `category=${category}`;
    const topCategoryUrl = `${topUrl}&${categoryArg}`;
    console.log(`fetchNews topCategoryUrl ${topCategoryUrl}`);
    return axios.get(topCategoryUrl);
}

function fetchMoreNews(request) {
    const categoryArg = request.category ? `category=${request.category}` : null;
    const queryArg = request.q ? `q=${encodeURIComponent(request.query)}` : null;
    const pageArg = request.page !== null ? `page=${request.page}` : null;

    const arg = ['&'] +[categoryArg, pageArg, queryArg].filter(x => x).join('&')

    const topCategoryUrl = `${topUrl}${arg}`;

    console.log(`fetchMoreNews topCategoryUrl ${topCategoryUrl}`);
    console.log("REQUEST")
    console.log(request)
    return axios.get(topCategoryUrl);
}

export function* fetchNewsSaga(action) {
    const { payload } = action;
    try {
        const response = yield call(fetchNews, payload);
        yield put(fetchNewsSucceed(response));
    } catch (error) {
        yield put(fetchNewsFailed(error.message));
    }
}

export function* fetchMoreNewsSaga(action) {
    const { payload } = action;

    try {
        const response = yield call(fetchMoreNews, payload);
        yield put(fetchMoreNewsSucceed(response));
    } catch (error) {
        yield put(fetchMoreNewsFailed(error.message));
    }
}

export function* newsWatcherSaga() {
    yield takeLatest(NEWS.FETCH, fetchNewsSaga);
    yield takeEvery(NEWS.FETCH_MORE, fetchMoreNewsSaga);
}