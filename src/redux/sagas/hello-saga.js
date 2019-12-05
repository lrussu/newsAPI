import { put, call, takeEvery, all } from 'redux-saga/effects'
import { fetchNews } from '../actions/news-actions'
import { CATEGORY, SEARCH } from '../actions/actionTypes'
import axios from "axios";
import { setCategory } from "../actions/category-actions";
import { newsWatcherSaga }  from './news-saga';
const apiUrl = 'https://newsapi.org/v2/';
const apiKey = 'apiKey=4e9b7b6204a74011856b2b966027895d';
const countryArg = 'country=us';

const topUrl = `${apiUrl}top-headlines?${apiKey}&${countryArg}`;
const everyUrl = `${apiUrl}everything?${apiKey}`;

function topNewsAPI(category) {
    const categoryArg = `category=${category}`;

    const topCategoryUrl = `${topUrl}&${categoryArg}`;
    return axios.get(topCategoryUrl);
}

function everyNewsAPI(query) {
    const queryArg = `q=${encodeURIComponent(query)}`;

    const everyQueryUrl = `${everyUrl}&${queryArg}`;

    return axios.get(everyQueryUrl);
}

function* fetchTopNewsAsyncEffectSaga(action) {
    try {
        // data is obtained after axios call is resolved
        let { data } = yield call(topNewsAPI, action.payload);
        // dispatch action to change redux state

        console.log("ACTION")
        console.log(action.payload)
        yield put(fetchNews(action.payload));

    } catch (e) {
        // alert using an alert library
    }
}

function* fetchNewsByQueryAsyncEffectSaga(action) {
    try {
        // data is obtained after axios call is resolved
        let { data } = yield call(everyNewsAPI, action.payload);
        // dispatch action to change redux state
        yield put(fetchNews(data.articles));

    } catch (e) {
        // alert using an alert library
    }
}

function* watcherSagaCategorySelect() {
    yield takeEvery(CATEGORY.SET, fetchTopNewsAsyncEffectSaga)
}

function* watcherSagaQuerySet() {
    yield takeEvery(SEARCH.QUERY, fetchNewsByQueryAsyncEffectSaga)
}

function* helloSaga() {
    yield put(setCategory('sports'))
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watcherSagaCategorySelect(),
     //   watcherSagaQuerySet(),
        newsWatcherSaga()
    ])
}