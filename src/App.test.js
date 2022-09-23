import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import App from './App'
import { dataModule } from './state'
import { STORE_ITEMS } from './components/store/constants'
import userEvent from '@testing-library/user-event'

describe('test App', () => {
  test('check if elements exists', () => {
    render(<App />)
    expect(screen.getByText('NFT shop')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'store', selected: true })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'basket', selected: false })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'profile', selected: false })).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('search..')).toBeInTheDocument()
    expect(screen.queryByRole('store-item')).not.toBeInTheDocument()
  })

  test('test case: user selects products add buy it', async () => {
    render(<App />)
    dataModule.state.items = STORE_ITEMS
    expect(await screen.findAllByRole('store-item')).toHaveLength(10)
    userEvent.type(screen.getByPlaceholderText('search..'), 'Hydrogen')
    await waitForElementToBeRemoved(() => screen.queryByText(/Helium$/))
    // eslint-disable-next-line
    expect(await screen.findAllByRole('store-item')).toHaveLength(1)
    userEvent.click(screen.getByText(/Hydrogen$/))
    userEvent.click(screen.getByRole('tab', { name: 'basket', selected: false }))
    expect(await screen.findByRole('tab', { name: 'basket', selected: true })).toBeInTheDocument()

    // basket tab

    expect(await screen.findByRole('table')).toBeInTheDocument()
    expect(screen.getByText('H')).toBeInTheDocument()
    expect(screen.getByText('2000$')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument()
    const btnPay = screen.getByRole('button', { name: /pay/i })
    expect(btnPay).toBeInTheDocument()
    window.alert = jest.fn()
    userEvent.click(btnPay)
    expect(window.alert).toBeCalledTimes(2)
    await waitForElementToBeRemoved(() => screen.queryByText('2000$'))
    expect(await screen.getByRole('table').textContent).toEqual('IDtitleprice')
    userEvent.click(screen.getByRole('tab', { name: 'profile', selected: false }))
    expect(await screen.findByRole('tab', { name: 'profile', selected: true })).toBeInTheDocument()

    // profile tab

    expect(screen.getByText(/orders history/i)).toBeInTheDocument()
    expect(await screen.findByRole('table')).toBeInTheDocument()
    expect(screen.getByText('H')).toBeInTheDocument()
    expect(screen.getByText('2000$')).toBeInTheDocument()
  })

  afterEach(() => {
    dataModule.reset()
  })
})
