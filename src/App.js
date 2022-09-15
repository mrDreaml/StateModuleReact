import './App.css';
import { navigationModule } from "./state";
import useSelector from "./lib/useSelector";
import Store from './components/store'

const NAV_MAP = {
    store: Store,
    basket: () => null,
    profile: () => null,
}

const Main = () => {
    const activeTab = useSelector(navigationModule, state => state.activeTab)
    const Component = NAV_MAP[activeTab]
    return <Component />
}

const NavMenu = () => {
    const activeTab = useSelector(navigationModule, state => state.activeTab)
    const handleNavigation = e => {
        navigationModule.state.activeTab = e.target.name
    }
    return (
        <nav className="app-header_nav">
            <button name="store" onClick={handleNavigation} className={activeTab === 'store' ? 'button_active' : ''}>store</button>
            <button name="basket" onClick={handleNavigation} className={activeTab === 'basket' ? 'button_active' : ''}>basket</button>
            <button name="profile" onClick={handleNavigation} className={activeTab === 'profile' ? 'button_active' : ''}>profile</button>
        </nav>
    )
}
const App = () => {

  return (
    <div className="app">
      <header className="app-header">
          <h1>NFT shop</h1>
          <NavMenu />
      </header>
      <Main />
    </div>
  );
}

export default App;
