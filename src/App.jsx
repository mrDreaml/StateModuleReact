import React from 'react'
import { navigationModule } from './state'
import useSelector from './lib/useSelector'
import Store from './components/store'
import Basket from './components/basket'
import Header from './components/header'
import Profile from './components/profile'

import './App.css'

const NAV_MAP = {
    store: Store,
    basket: Basket,
    profile: Profile,
}

const Main = () => {
    const activeTab = useSelector(navigationModule, state => state.activeTab)
    const Component = NAV_MAP[activeTab]
    return <Component />
}

const App = () => (
    <div className='app'>
      <Header />
      <Main />
    </div>
  )

export default App
