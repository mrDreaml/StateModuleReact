import React from 'react'
import useSelector from '../../lib/useSelector'
import { navigationModule } from '../../state'

const getClassName = (activeTab, alertTab, name) => (activeTab === name ? 'button_active' : '').concat(
    alertTab === name ? ' app-header_button_effect' : ''
)

const NavMenu = () => {
    const { activeTab, alertTab } = useSelector(navigationModule, state => state)
    const handleNavigation = e => {
        navigationModule.state.activeTab = e.target.name
    }

    return (
        <nav className='app-header_nav'>
            <button name='store' onClick={handleNavigation} className={getClassName(activeTab, alertTab, 'store')}>store</button>
            <button name='basket' onClick={handleNavigation} className={getClassName(activeTab, alertTab, 'basket')}>basket</button>
            <button name='profile' onClick={handleNavigation} className={getClassName(activeTab, alertTab, 'profile')}>profile</button>
        </nav>
    )
}

const Header = () => (
    <header className='app-header'>
        <h1>NFT shop</h1>
        <NavMenu />
    </header>
)

export default Header
