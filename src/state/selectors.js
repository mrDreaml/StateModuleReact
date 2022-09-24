const formatString = str => str.toLowerCase().trim()

export const getFilteredData = (dataModuleState, { filters }) =>
    dataModuleState.items.filter(({ price, title, description }) => {
        const titleFormatted = formatString(title)
        const descriptionFormatted = formatString(description)
        const searchFormatted = formatString(filters.search)
        return (+price.slice(0, -1) > +filters.price) &&
            (searchFormatted === ''
            ? true
            : (titleFormatted.includes(searchFormatted) || descriptionFormatted.includes(searchFormatted))
            )
    })
