import StateModule from 'state-module'

export const navigationModule = new StateModule({
    activeTab: 'store',
    alertTab: null,
    basketFilters: { search: '', price: '0' },
}, 300)

export const dataModule = new StateModule({
    items: [],
})

export const basketModule = new StateModule({
    orders: {},
})

export const profileModule = new StateModule({
    userName: 'User Name',
    historyOrders: [],
})

window.getState = () => console.log({
    navigationState: { ...navigationModule.state },
    dataModule: { ...dataModule.state },
    basketModule: { ...basketModule.state },
    profileModule: { ...profileModule.state },
})
