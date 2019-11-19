import React, { Component } from 'react';
import PersistentDrawerLeft from './layout/layout.js';
import { BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const apiUrl = 'https://newsapi.org/v2/';
const apiKey = 'apiKey=e0db911125a640929f14373ef2b3a766';
const countryArg = 'country=us';

const langStr = 'ar de en es fr he it nl no pt ru se ud zh';
const lang = langStr.split(' ');

const countryStr = 'ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za';
const country = countryStr.split(' ');

class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <PersistentDrawerLeft/>
            </BrowserRouter>
        )
    }
}

export default App;
