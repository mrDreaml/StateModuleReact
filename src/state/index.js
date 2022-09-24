import { navigationModule } from './actions/navigation'
import { dataModule } from './actions/data'
import { storeModule } from './actions/store'
import { basketModule } from './actions/basket'
import { profileModule } from './actions/profile'

export { navigationModule, dataModule, storeModule, basketModule, profileModule }

window.getState = () => console.log({
    storeModule: { ...storeModule.state },
    navigationModule: { ...navigationModule.state },
    dataModule: { ...dataModule.state },
    basketModule: { ...basketModule.state },
    profileModule: { ...profileModule.state },
})
