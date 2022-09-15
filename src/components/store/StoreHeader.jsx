import React, { useCallback, useMemo, useState } from 'react'
import { navigationModule } from '../../state'

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
                type='range'
                value={value}
                min='0'
                max='5000'
                step='10'
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
        type='text'
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

export default StoreHeader
