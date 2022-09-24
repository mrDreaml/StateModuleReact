import StateModule from 'state-module'

export const navigationModule = new StateModule({
    activeTab: 'store',
    alertTab: null,
}, 300)

export const changeActiveTab = (activeTabName) => {
    navigationModule.state.activeTab = activeTabName
}

export const alertTab = (tabName) => {
    navigationModule.state.alertTab = tabName
    setTimeout(() => {
        navigationModule.state.alertTab = null
    }, 300)
}
