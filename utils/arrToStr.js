
function arrToStr(str) {
    // Split text
    let untrimArr = str.split(',')

    // Trim array elements
    let trimArr = []

    // Push trim elements to trimArr
    for(let i = 0; i < untrimArr.length; i++) {
        trimArr.push(untrimArr[i].trim())
    }

    return trimArr
}

module.exports = arrToStr
