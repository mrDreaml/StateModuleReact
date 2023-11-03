import { useEffect, useState, useRef } from 'react'

const EMPTY_ARRAY = []
const identity = s => s
const repack = s => ({ ...s });

const useSelector = (StateModule, selector = identity, deps = EMPTY_ARRAY) => {
    const ref = useRef()
    ref.current = selector
    const [state, updateState] = useState()

    const isMultyStore = Array.isArray(StateModule)
    const getMultyState = () => StateModule.map(m => repack(m.state))

    useEffect(() => {
        updateState(ref.current(...isMultyStore ? getMultyState() : [repack(StateModule.state)]))
    }, deps)

    useEffect(() => {
        const subscriber = () => {
            updateState(ref.current(...isMultyStore ? getMultyState() : [repack(StateModule.state)]))
        }
        isMultyStore ? StateModule.forEach(m => m.subscribe(subscriber)) : StateModule.subscribe(subscriber)
        return () => isMultyStore ? StateModule.forEach(m => m.unsubscribe(subscriber)) : StateModule.unsubscribe(subscriber)
    }, [])

    return state ?? selector(...isMultyStore ? getMultyState() : [repack(StateModule.state)])
}

export default useSelector
