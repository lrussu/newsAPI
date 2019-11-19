import React, { Component } from 'react';
import PersistentDrawerLeft from './layout/layout.js';
import { BrowserRouter} from 'react-router-dom';

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
