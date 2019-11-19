import { put, call, takeEvery, all } from 'redux-saga/effects'
import { setCategory } from '../actions/category-actions'
import { fetchedNews } from '../actions/news-actions'
import { searchByQuery, searchByCategory } from '../actions/search-actions'
import { CATEGORY, SEARCH, NEWS } from '../actions/actionTypes'
import axios from "axios";


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
    const queryArg = `q=${query}`;

    const everyQueryUrl = `${everyUrl}&${queryArg}`;
    return axios.get(everyQueryUrl);
}

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* fetchTopNewsAsyncEffectSaga(action) {
    yield delay(1000)
    yield console.log('fetchTopNewsAsyncEffectSaga()')
    yield put(searchByCategory('sports'))

    try {
        // data is obtained after axios call is resolved
        let { data } = yield call(topNewsAPI, action.payload);
        console.log(data.articles)
        // dispatch action to change redux state
        yield put(fetchedNews(data.articles));

    } catch (e) {
        // alert using an alert library
    }
}

function* fetchNewsByQueryAsyncEffectSaga(action) {
    yield delay(1000)
    yield console.log('fetchNewsByQueryAsyncEffectSaga()')
    yield put(searchByQuery('sports'))

    try {
        // data is obtained after axios call is resolved
        let { data } = yield call(everyNewsAPI, action.payload);
        console.log(data.articles)
        // dispatch action to change redux state
        yield put(fetchedNews(data.articles));

    } catch (e) {
        // alert using an alert library
    }
}

function* watcherSagaCategorySelect() {
    yield console.log('watchCategorySelect()')
    yield takeEvery(CATEGORY.SET, fetchTopNewsAsyncEffectSaga)
}

function* watcherSagaQuerySet() {
    yield console.log('watchCategorySelect()')
    yield takeEvery(SEARCH.QUERY, fetchNewsByQueryAsyncEffectSaga)
}

function* helloSaga() {
    console.log('Hello Sagas!')
}

export default function* rootSaga() {
    yield all([
        helloSaga(),
        watcherSagaCategorySelect(),
        watcherSagaQuerySet()
    ])
}