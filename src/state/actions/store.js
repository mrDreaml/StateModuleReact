import StateModule from 'state-module'

export const storeModule = new StateModule({
    filters: { search: '', price: '0' },
})

export const addFilter = (filterName, value) => {
    storeModule.state.filters = { ...storeModule.state.filters, [filterName]: value }
}
