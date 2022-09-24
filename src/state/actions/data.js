import StateModule from 'state-module'
import { STORE_ITEMS } from '../../components/store/constants'

export const dataModule = new StateModule({
    items: [],
})

const fetchData = () => new Promise(res => {
    setTimeout(() => { // simulate loading
        res(STORE_ITEMS)
    }, 1000)
})

export const loadData = async () => {
    dataModule.state.items = await fetchData()
}
