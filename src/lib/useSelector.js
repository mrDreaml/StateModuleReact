import { useEffect, useState, useId } from 'react'

const deepFreeze = obj => {
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) {deepFreeze(obj[prop])}
    })
    return Object.freeze(obj)
}

const EMPTY_ARRAY = []

const useSelector = (StateModule, selector, deps = EMPTY_ARRAY) => {
    const [state, updateState] = useState(selector({ ...StateModule.state }))
    useEffect(() => {
        updateState(selector({ ...StateModule.state }))
    }, deps)
    useEffect(() => {
        const subscriber = (newRootState) => {
            const newState = selector(newRootState)
            if (state !== newState) {
                updateState(newState)
            }
        }
        StateModule.subscribe(subscriber)
        return () => StateModule.unsubscribe(subscriber)
    }, [state])
    return state
}
export default useSelector
