import React, { useMemo } from 'react'
import useSelector from '../../lib/useSelector'
import { basketModule, dataModule } from '../../state'

import './Basket.css'
import { _omit } from '../../utils/_'

const Table = ({ items, onRemoveItem }) => (
    <table className='basket_table'>
        <thead>
        <tr>
            <th>ID</th>
            <th>title</th>
            <th>price</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {items.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td className='basket_table-control-column'>
                    <button data-id={item.id} onClick={onRemoveItem}>remove</button>
                </td>
            </tr>
        ))}

        </tbody>
    </table>
)

const Basket = () => {
    const items = useSelector(dataModule, state => state.items)
    const filteredItems = useSelector(basketModule, state => {
        const ids = Object.keys(state.orders)
        return items.filter(item => ids.includes(item.id))
    })
    const totalSum = useMemo(() => filteredItems.reduce(
        (acc, { price }) => acc + parseFloat(price), 0), [filteredItems])

    const onRemoveItemHandler = event => {
        basketModule.state.orders = _omit([event.target.dataset.id], basketModule.state.orders)
    }

    const handlePay = () => {
        alert('Now you pay:)')
        alert('Success')
        basketModule.state.orders = {}
    }

    const isPayDisabled = !filteredItems.length

    return (
        <div className='basket'>
            <Table items={filteredItems} onRemoveItem={onRemoveItemHandler} />
            <h2 className='basket_totalSum'>Total: {totalSum}$</h2>
            <button disabled={isPayDisabled} className={`basket_button-pay ${isPayDisabled ? 'disabled' : ''}`} onClick={handlePay}>Pay</button>
        </div>
    )
}

export default Basket
