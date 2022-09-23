import { render, screen } from '@testing-library/react'
import Header from './Header.jsx'
import { navigationModule } from '../../state'
import userEvent from '@testing-library/user-event'

describe('test Header', () => {
    test('check label text', () => {
        render(<Header />)
        expect(screen.getByText('NFT shop')).toBeInTheDocument()
    })
    test('check navigation', () => {
        render(<Header />)
        const navigation = screen.getByRole('navigation')
        expect(navigation).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'store', selected: true })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'basket', selected: false })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'profile', selected: false })).toBeInTheDocument()
    })
    test('check navigation after change activeTab state', async () => {
        navigationModule.state.activeTab = 'basket'
        render(<Header />)
        const navigation = screen.getByRole('navigation')
        expect(navigation).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'store', selected: false })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'basket', selected: true })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'profile', selected: false })).toBeInTheDocument()
        navigationModule.state.activeTab = 'profile'
        expect(await screen.findByRole('tab', { name: 'store', selected: false })).toBeInTheDocument()
        expect(await screen.findByRole('tab', { name: 'basket', selected: false })).toBeInTheDocument()
        expect(await screen.findByRole('tab', { name: 'profile', selected: true })).toBeInTheDocument()
        navigationModule.reset()
    })
    test('check navigation after change activeTab by click', async () => {
        render(<Header />)
        const navigation = screen.getByRole('navigation')
        expect(navigation).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'store', selected: true })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'basket', selected: false })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'profile', selected: false })).toBeInTheDocument()
        userEvent.click(screen.getByRole('tab', { name: 'basket' }))
        expect(await screen.findByRole('tab', { name: 'store', selected: false })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'basket', selected: true })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'profile', selected: false })).toBeInTheDocument()
    })
})
