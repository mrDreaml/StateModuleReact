import { useEffect, useState, useRef } from 'react'

const EMPTY_ARRAY = []

const useSelector = (StateModule, selector, deps = EMPTY_ARRAY) => {
    const ref = useRef()
    ref.current = selector
    const [state, updateState] = useState(selector({ ...StateModule.state }))
    useEffect(() => {
        updateState(ref.current({ ...StateModule.state }))
    }, deps)
    useEffect(() => {
        const subscriber = (newRootState) => {
            const newState = ref.current(newRootState)
            updateState(newState)
        }
        StateModule.subscribe(subscriber)
        return () => StateModule.unsubscribe(subscriber)
    }, [])
    return state
}

export default useSelector
