import StateModule from 'state-module'

export const navigationModule = new StateModule({
    activeTab: 'store',
})

window.getState = () => console.log({ navigationState: { ...navigationModule.state } })
