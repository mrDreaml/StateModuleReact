import { useEffect, useState } from "react";

const deepFreeze = obj => {
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
    });
    return Object.freeze(obj);
};

const useSelector = (StateModule, selector) => {
    const [state, updateState] = useState(selector(StateModule.state))
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
