const formatString = str => str.toLowerCase().trim()

export const getFilteredData = (dataModuleState, { basketFilters }) =>
    dataModuleState.items.filter(({ price, title, description }) => {
        const titleFormatted = formatString(title)
        const descriptionFormatted = formatString(description)
        const searchFormatted = formatString(basketFilters.search)
        return (+price.slice(0, -1) > +basketFilters.price) &&
            (searchFormatted === ''
            ? true
            : (titleFormatted.includes(searchFormatted) || descriptionFormatted.includes(searchFormatted))
            )
    })
