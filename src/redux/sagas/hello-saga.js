import { put, call, takeEvery, all } from 'redux-saga/effects'
import { fetchedNews } from '../actions/news-actions'
import { CATEGORY, SEARCH } from '../actions/actionTypes'
import axios from "axios";
import {setCategory} from "../actions/category-actions";

const apiUrl = 'https://newsapi.org/v2/';
const apiKey = 'apiKey=e0db911125a640929f14373ef2b3a766';
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
    console.log(everyQueryUrl)
    return axios.get(everyQueryUrl);
}

function* fetchTopNewsAsyncEffectSaga(action) {
    try {
        // data is obtained after axios call is resolved
        let { data } = yield call(topNewsAPI, action.payload);
        // dispatch action to change redux state
        yield put(fetchedNews(data.articles));

    } catch (e) {
        // alert using an alert library
    }
}

function* fetchNewsByQueryAsyncEffectSaga(action) {
    try {
        // data is obtained after axios call is resolved
        let { data } = yield call(everyNewsAPI, action.payload);
        // dispatch action to change redux state
        yield put(fetchedNews(data.articles));

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
    yield put(setCategory('sport'))
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watcherSagaCategorySelect(),
        watcherSagaQuerySet()
    ])
}