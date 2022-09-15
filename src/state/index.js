import StateModule from 'state-module'

export const navigationModule = new StateModule({
    activeTab: 'store',
    basketFilters: { search: '', price: '0' },
}, 300)

export const dataModule = new StateModule({
    basket: [],
})

window.getState = () => console.log({
    navigationState: { ...navigationModule.state },
    dataModule: { ...dataModule.state }
})
