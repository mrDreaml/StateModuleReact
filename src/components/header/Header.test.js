import { render, screen } from '@testing-library/react'
import Header from './Header.jsx'
import { navigationModule } from '../../state'

// TODO: check styles? toHaveStyle
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
    test('check navigation after change activeTab state', () => {
        navigationModule.state.activeTab = 'basket'
        const { rerender } = render(<Header />)
        let navigation = screen.getByRole('navigation')
        expect(navigation).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'store', selected: false })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'basket', selected: true })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'profile', selected: false })).toBeInTheDocument()
        navigationModule.state.activeTab = 'profile'
        rerender(<Header />)
        expect(screen.getByRole('tab', { name: 'store', selected: false })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'basket', selected: true })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'profile', selected: false })).toBeInTheDocument()
    })
})
