import StateModule from 'state-module'
import { _omit } from '../../utils/_'

export const basketModule = new StateModule({
    orders: {},
})

export const removeOrder = (key) => {
    basketModule.state.orders = _omit([key], basketModule.state.orders)
}

export const addOrder = (key) => {
    basketModule.state.orders = { ...basketModule.state.orders, [key]: true }
}

export const setOrdersAfterPay = () => {
    basketModule.state.orders = {}
}
