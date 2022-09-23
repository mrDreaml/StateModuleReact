import React, { useEffect } from 'react'
import { dataModule } from '../../state'

import StoreHeader from './StoreHeader'
import StoreDataView from './StoreDataView'
import { STORE_ITEMS } from './constants'

import './Store.css'

const getData = () => new Promise(res => {
    setTimeout(() => { // simulate loading
        res(STORE_ITEMS)
    }, 1000)
})

const Store = () => {
    useEffect(() => {
        getData().then(res => dataModule.state.items = res)
    }, [])
    return (
        <div className='store'>
            <StoreHeader />
            <StoreDataView />
        </div>
    )
}

export default Store
