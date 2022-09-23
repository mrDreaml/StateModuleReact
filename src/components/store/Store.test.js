/* eslint-disable jest-dom/prefer-in-document */
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import Store from '../store'
import { dataModule } from '../../state'
import { STORE_ITEMS } from './constants'
import userEvent from '@testing-library/user-event'

describe('test Store', () => {
    test('check if elements exists', async () => {
        render(<Store />)
        expect(screen.getByRole('slider')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('search..')).toBeInTheDocument()

        dataModule.state.items = STORE_ITEMS
        expect(screen.queryByRole('store-item')).not.toBeInTheDocument()
    })

    test('check loading items', async () => {
        render(<Store />)
        dataModule.state.items = STORE_ITEMS
        expect(await screen.findAllByRole('store-item')).toHaveLength(10)
    })

    test('check search', async () => {
        render(<Store />)
        dataModule.state.items = STORE_ITEMS
        expect(await screen.findAllByRole('store-item')).toHaveLength(10)
        userEvent.type(screen.getByPlaceholderText('search..'), 'Hydrogen')
        await waitForElementToBeRemoved(() => screen.queryByText(/Helium$/))
        expect(await screen.findAllByRole('store-item')).toHaveLength(1)
    })

    afterEach(() => {
        dataModule.reset()
    })
})
