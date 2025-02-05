const SparseVercel = require("./vercel")

class SparseTree{
    #originArray
    #tree = []
    constructor(array){
        this.#originArray = array
        this.#initializeTree()
    }
    getSumByRange(range){
        let [from, to] = this.#parseRange(range)
        // Установка валидных значений для from и to в случае передачи ренжи больше, чем размер массива или меньше
        return this.#getSum(from, to, this.#tree[0])
    }
    #setValidFromTo(from, to){
        let currentFrom = from
        let currentTo = to
        if (!from){
            from = '0'
        }
        if (Number(from) > this.#originArray.length - 1){
            currentFrom = '0'
        }
        if (!to){
            to = this.#originArray.length - 1
        }
        if (to >= this.#originArray.length){
            currentTo = String(this.#originArray.length - 1)
        }
        return [Number(currentFrom), Number(currentTo)]
    }
    #parseRange(str){
        let parsed = str.split(':')
        let valid = this.#setValidFromTo(parsed[0], parsed[1])
        return valid
    }
    #getSum(from, to, node){
        if (!node){
            return 0
        }
        let nodeRange = node.getRange()
        if (from > nodeRange.to || to < nodeRange.from){
            return 0
        }
        if(from === nodeRange.from && to === nodeRange.to){
            return node.getSum()
        }
        if(from <= nodeRange.from && to >= nodeRange.to){
            return node.getSum()
        }
        let {left, right} = node.getChilds()
        return this.#getSum(from, to, left) + this.#getSum(from, to, right)       
    }
    #initializeTree(){
        let rowsMatrix = this.#createRowsMatrix() 
        let steps = 0
        while(steps < rowsMatrix.length){
            let currentMatrixRow = rowsMatrix[rowsMatrix.length - 1 - steps]
            for (let i = 0; i < currentMatrixRow.length; i ++){
                currentMatrixRow[i].setIndex(this.#tree.length)
                this.#tree.push(currentMatrixRow[i])
            }
            steps++
        }   
    }
    #createRowsMatrix(rowsMatrix = []){
        let rowsMatrixLength = rowsMatrix.length
        if (rowsMatrixLength === 0){
            rowsMatrix[0] = []
            for (let i=0; i < this.#originArray.length; i++){
                let ver = new SparseVercel(`${i}`)
                ver.defineSum(this.#originArray[i])
                rowsMatrix[0].push(ver)
            }
            return this.#createRowsMatrix(rowsMatrix)
        }
        else {
            if(rowsMatrix[rowsMatrixLength - 1].length === 1){
                return rowsMatrix
            }
            rowsMatrix[rowsMatrixLength] = []
            for (let i = 0, j=0, k=1; i < Math.ceil(rowsMatrix[rowsMatrixLength - 1].length / 2); i++, j +=2, k +=2){
                let children1 = rowsMatrix[rowsMatrixLength - 1][j]
                let children2 = rowsMatrix[rowsMatrixLength - 1][k]
                let childs1Range = children1?.getRange()
                let childs2Range = children2?.getRange()
                let range
                if (children1 && children2){
                    range = `${childs1Range.from}:${childs2Range.to}`
                }
                else {
                    range = `${childs1Range.from}:${childs1Range.to}`
                }
                let ver = new SparseVercel(range)
                ver.defineChildrenAndSetParrent(children1, children2)
                ver.calculateSum()
                rowsMatrix[rowsMatrixLength].push(ver)
            }
            return this.#createRowsMatrix(rowsMatrix)
        }
    }
}

module.exports = SparseTree