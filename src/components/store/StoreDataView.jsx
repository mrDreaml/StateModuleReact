import React, { useCallback } from 'react'
import useSelector from '../../lib/useSelector'
import { basketModule, dataModule, storeModule } from '../../state'
import { getFilteredData } from '../../state/selectors'
import { alertTab } from '../../state/actions/navigation'
import { addOrder, removeOrder } from '../../state/actions/basket'

const StoreItem = ({ id, title, description, price, src, onSelect }) => {
    const onSelectHandler = (event) => onSelect(id, event)
    const onKeyDownHandler = (event) => event.code === 'Enter' && onSelectHandler(event)
    return (
        <div
            role='store-item'
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

let render = 0

const StoreDataView = () => {
    const storeItems = useSelector(
        [storeModule, dataModule],
         (storeState, dataState) => getFilteredData(dataState, { filters: storeState.filters })
        )

    const clickHandler = useCallback((id, _event) => {
        alertTab('basket');
        (basketModule.state.orders[id] ? removeOrder : addOrder)(id)
    }, [])

    return (
        <main className='store-main'>
            <h1>{render++}</h1>
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
