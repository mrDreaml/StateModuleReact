import StateModule from 'state-module'

export const profileModule = new StateModule({
    userName: 'User Name',
    historyOrders: [],
})

export const setProfileUserName = (name) => {
    profileModule.state.userName = name
}

export const addHistoryOrders = (items) => {
    profileModule.state.historyOrders = [...profileModule.state.historyOrders, { date: new Date(), items: [...items] }]
}
