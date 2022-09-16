import React, { useEffect, useState, useRef } from 'react'

import useSelector from '../../lib/useSelector'
import { profileModule } from '../../state'

import './Profile.css'

const Name = (props) => {
    const valueRef = useRef()
    const [isText, setIsText] = useState(true)
    const toggleMode = () => setIsText(state => !state)
    const onToggleFromInputMode = (event) => {
        if (event.code === 'Enter') {
            toggleMode()
            valueRef.current.value = event.target.value
        }
    }

    useEffect(() => {
        valueRef.current ??= {}
        valueRef.current.value = props.value
    }, [props.value])
    useEffect(() => () => {
        profileModule.state.userName = valueRef.current.value
    }, [])

    return <div className='profile_name' title='double click to edit'>
        {isText
            ? <h2
                tabIndex={0}
                onDoubleClick={toggleMode}
                onKeyDown={event => event.code === 'Enter' && toggleMode()}
            >{valueRef.current?.value}</h2>
            : <input
            onKeyDown={onToggleFromInputMode}
            type='text'
            name='profileName'
            defaultValue={valueRef.current?.value}
        /> }
    </div>
}

const Table = ({ items }) => (
    <table className='profile_history-orders-table'>
        <thead>
        <tr>
            <th>ID</th>
            <th>title</th>
            <th>price</th>
        </tr>
        </thead>
        <tbody>
        {items.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
            </tr>
        ))}

        </tbody>
    </table>
)

const Profile = () => {
    const { userName, historyOrders } = useSelector(profileModule, state => state)
    return (
        <div className='profile'>
            <Name value={userName} />
            <h3>Orders History</h3>
            {historyOrders.map(orderData => <Table key={orderData.date} items={orderData.items} />)}
        </div>
    )
}

export default Profile
