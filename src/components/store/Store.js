import logo from '../../shared/logo.svg';
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {dataModule, navigationModule} from "../../state";
import {getFilteredData} from "../../state/selectors";
import useSelector from "../../lib/useSelector";

import './Store.css'

const STORE_ITEMS = [
    {
        id: '#1',
        title: 'H',
        description: 'Hydrogen',
        price: '2000$',
        src: logo,
    },
    {
        id: '#2',
        title: 'He',
        description: 'Helium',
        price: '2100$',
        src: logo,
    },
    {
        id: '#3',
        title: 'Li',
        description: 'Lithium',
        price: '1020$',
        src: logo,
    },
    {
        id: '#4',
        title: 'Be',
        description: 'Beryllium',
        price: '135$',
        src: logo,
    },
    {
        id: '#5',
        title: 'B',
        description: 'Boron',
        price: '10$',
        src: logo,
    },
    {
        id: '#6',
        title: 'C',
        description: 'Carbon',
        price: '200$',
        src: logo,
    },
    {
        id: '#7',
        title: 'N',
        description: 'Nitrogen',
        price: '1$',
        src: logo,
    },
    {
        id: '#8',
        title: 'O',
        description: 'Oxygen',
        price: '9999$',
        src: logo,
    },
    {
        id: '#9',
        title: 'Na',
        description: 'Sodium',
        price: '239$',
        src: logo,
    },
    {
        id: '#10',
        title: 'Mg',
        description: 'Magnesium',
        price: '3$',
        src: logo,
    }
]

const getData = () => new Promise(res => {
    setTimeout(() => { // simulate loading
        res(STORE_ITEMS)
    }, 1000)
})

const StoreItem = ({ title, description, price, src }) => {

    return (
        <div className='store-item' title='Click to add to basket'>
            <img className='store-item_image' src={src} alt={title} />
            <h2 className='store-item_title'>({title}) {description}</h2>
            <h3 className='store-item_price'>Price: {price}</h3>
        </div>
    )
}

const PriceFilter = ({ name, initialValue = '0', onChange }) => {
    const [value, setValue] = useState(initialValue)
    return (
        <div className='filter_range'>
            <label htmlFor={name}>Price</label>
            <input
                name={name}
                onChange={({ target: { value } }) => {
                setValue(value)
                onChange?.(name, value)
            }}
                type="range"
                value={value}
                min="0"
                max="5000"
                step="10"
            />
            <label htmlFor='filter-price'>{value} $</label>
        </div>
    )
}

const SearchFilter = ({ name, placeholder = 'search..', initialValue = '', onChange }) => {
    const [value, setValue] = useState(initialValue)
    return <input
        name={name}
        onChange={({ target: { value } }) => {
            setValue(value)
            onChange?.(name, value)
        }}
        type="text"
        value={value}
        className='filter_input'
        placeholder={placeholder}
    />
}

const StoreHeader = () => {
    const filterHandler = useCallback((name, value) => {
        navigationModule.state.basketFilters = { ...navigationModule.state.basketFilters, [name]: value }
    }, [])
    const initialValues = useMemo(() => navigationModule.state.basketFilters, [])
    return (
        <header className='store-header'>
            <SearchFilter name='search' onChange={filterHandler} initialValue={initialValues.search} />
            <PriceFilter name='price' onChange={filterHandler} initialValue={initialValues.price} />
        </header>
    )
}

const StoreDataView = () => {
    const basketFilters = useSelector(navigationModule, state => state.basketFilters)
    const storeItems = useSelector(dataModule, state => getFilteredData(state, { basketFilters }), [basketFilters])

    return (
        <main className='store-main'>
            {!storeItems.length && 'Loading...'}
            {storeItems.map(({ id, title, description, price, src }) =>
                <StoreItem key={id} title={title} description={description} price={price} src={src} />
            )}
        </main>
    )
}

const Store = () => {
    useEffect(() => {
        getData().then(res => dataModule.state.basket = res)
    }, [])
    return (
        <div className="store">
            <StoreHeader />
            <StoreDataView />
        </div>
    )
}

export default Store
