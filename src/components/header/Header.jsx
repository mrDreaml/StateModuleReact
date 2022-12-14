import React from 'react'
import useSelector from '../../lib/useSelector'
import { navigationModule } from '../../state'
import { changeActiveTab } from '../../state/actions/navigation'

const getClassName = (activeTab, alertTab, name) => (activeTab === name ? 'button_active' : '').concat(
    alertTab === name ? ' app-header_button_effect' : ''
)

const NavMenu = () => {
    const { activeTab, alertTab } = useSelector(navigationModule, state => state)
    const handleNavigation = e => changeActiveTab(e.target.name)

    return (
        <nav className='app-header_nav'>
            <button
                name='store'
                role='tab'
                aria-selected={activeTab === 'store'}
                onClick={handleNavigation}
                className={getClassName(activeTab, alertTab, 'store')}
            >
                store
            </button>
            <button
                name='basket'
                role='tab'
                aria-selected={activeTab === 'basket'}
                onClick={handleNavigation}
                className={getClassName(activeTab, alertTab, 'basket')}
            >
                basket
            </button>
            <button
                name='profile'
                role='tab'
                aria-selected={activeTab === 'profile'}
                onClick={handleNavigation}
                className={getClassName(activeTab, alertTab, 'profile')}
            >
                profile
            </button>
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
