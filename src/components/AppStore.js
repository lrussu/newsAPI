import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { AppProvider } from './AppContext'

const AppStore = ({ children }) => {
    const [appState, setAppState] = useState({
        products: [],
    })

    const updateState = (prop, newVal) => {
        setAppState(prevState => ({
            ...prevState,
            [prop]: newVal,
        }))
    }

    useEffect(() => {
        axios.get('/mock/products.json').then(response => {
            const {
                data: { products },
            } = response

            updateState('products', products)
            updateState('updateState', updateState)
        })
    }, [])

    return <AppProvider value={appState}>{children}</AppProvider>
}

AppStore.propTypes = {
    children: PropTypes.element.isRequired,
}

export default AppStore
