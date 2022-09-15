export const _omit = (keys, obj) => Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key)) {
        acc[key] = obj[key]
    }
    return acc
}, {})
