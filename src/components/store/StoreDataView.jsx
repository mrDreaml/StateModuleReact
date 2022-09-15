import React, { useCallback } from 'react'
import useSelector from '../../lib/useSelector'
import {basketModule, dataModule, navigationModule} from '../../state'
import { getFilteredData } from '../../state/selectors'
import {_omit} from "../../utils/_";

const StoreItem = ({ id, title, description, price, src, onSelect }) => {
    const onSelectHandler = (event) => onSelect(id, event)
    const onKeyDownHandler = (event) => event.code === 'Enter' && onSelectHandler(event)
    return (
        <div
            className='store-item'
            title='Click to add to basket'
            tabIndex={0}
            onClick={onSelectHandler}
            onKeyDown={onKeyDownHandler}
        >
            <img className='store-item_image' src={src} alt={title} />
            <h2 className='store-item_title'>({title}) {description}</h2>
            <h3 className='store-item_price'>Price: {price}</h3>
        </div>
    )
}

const StoreDataView = () => {
    const basketFilters = useSelector(navigationModule, state => state.basketFilters)
    const storeItems = useSelector(dataModule, state => getFilteredData(state, { basketFilters }), [basketFilters])

    const clickHandler = useCallback((id, _event) => {
        navigationModule.state.alertTab = 'basket'
        if (basketModule.state.orders[id]) {
            basketModule.state.orders = _omit([id], basketModule.state.orders)
        } else {
            basketModule.state.orders = { ...basketModule.state.orders, [id]: true }
        }
        setTimeout(() => {
            navigationModule.state.alertTab = null
        }, 300)
    }, [])

    return (
        <main className='store-main'>
            {!storeItems.length && 'Loading...'}
            {storeItems.map(({ id, title, description, price, src }) =>
                <StoreItem
                    id={id}
                    key={id}
                    title={title}
                    onSelect={clickHandler}
                    description={description}
                    price={price}
                    src={src}
                />
            )}
        </main>
    )
}

export default StoreDataView
