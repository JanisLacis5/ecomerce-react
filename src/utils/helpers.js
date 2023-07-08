export const formatPrice = (price) => {
    return parseFloat(price / 100).toFixed(2)
}

export const getUniqueValues = (arr, value) => {
    const a = arr.map((item) => item[value])
    const newArr = a.flat()
    return ["all", ...new Set(newArr)]
}
