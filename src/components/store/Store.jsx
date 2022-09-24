import React, { useEffect } from 'react'

import StoreHeader from './StoreHeader'
import StoreDataView from './StoreDataView'
import { loadData } from '../../state/actions/data'

import './Store.css'


const Store = () => {
    useEffect(() => {
        loadData()
    }, [])
    return (
        <div className='store'>
            <StoreHeader />
            <StoreDataView />
        </div>
    )
}

export default Store
