class StringPrintResult {
    execute(result){
        let resultedString = `start`
        let index = result.path.length - 1
        while(index >= 0){
            resultedString = `${resultedString}=>${result.path[index].index}(${result.path[index].sum})`
            index--
        }
        resultedString += '=>finish'
        return {
            sum: result.max_sum,
            path:resultedString
        }
    }
}

module.exports = {StringPrintResult}