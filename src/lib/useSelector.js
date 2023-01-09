import { useEffect, useState, useRef } from 'react'

const EMPTY_ARRAY = []
const identity = s => s

const useSelector = (StateModule, selector = identity, deps = EMPTY_ARRAY) => {
    const ref = useRef()
    ref.current = selector
    const [state, updateState] = useState()

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

    return state ?? selector({ ...StateModule.state })
}

export default useSelector
