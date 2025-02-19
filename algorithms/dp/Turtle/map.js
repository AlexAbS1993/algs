class MapForTurtle {
    #rows
    #collumns
    #map
    constructor(xCount, yCount){
        this.#validate(xCount, yCount)
        this.#rows = xCount
        this.#collumns = yCount
        this.#createEmptyMap()
    }
    #validate(xCount, yCount){
        if (!xCount || !yCount){
            throw new Error('Недостаточно аргументов для конструктора или передана не матрица')
        }
        if (typeof xCount !== 'number' || typeof yCount !== 'number'){
            throw new Error('Значение рядов и колонок должно быть числом')
        }
        if (xCount < 1 || yCount < 1){
            throw new Error('Число рядов и колонок должно быть положительным')
        }
    }
    #createEmptyMap(){
        this.#map = []
        for(let i = 0; i < this.#rows; i++){
            if(!this.#map[i]){
                this.#map[i] = []
            }
            for(let j = 0; j < this.#collumns; j++){
                this.#map[i].push({value: null})
            }
        }
    }
    static createMapFromArray(arr){
        const rows = arr.length
        const collumns = arr[0].length
        const map = new MapForTurtle(rows, collumns)
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < collumns; j++){
                let element = {
                    value: arr[i][j]
                }
                map.insert(i+1, j+1, element)
            }
        }
        return map
    }
    static createRandomMap(xCount, yCount){
        let map = new MapForTurtle(xCount, yCount)
        const {rows, collumns} = map.getInfo()
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < collumns; j++){
                let element = {
                    value: -50 + Math.floor(Math.random() * 100)
                }
                map.insert(i+1, j+1, element)
            }
        }
        return map
    }
    point(x, y){
        let rowsIndex = x - 1
        let collumnsIndex = y - 1
        this.#isPointExists(rowsIndex, collumnsIndex)
        return this.#map[rowsIndex]?.[collumnsIndex] 
    }
    #isPointExists(row, col){
        if (!this.#map[row]?.[col]){
            throw new Error('Такого значения не существует')
        }
    }
    getInfo(){
        return {
            rows: this.#rows,
            collumns: this.#collumns,
            grid: `${this.#rows}x${this.#collumns}`
        }
    }
    insert(row, column, element){
        let rowIndex = row - 1
        let columnIndex = column - 1
        this.#isPointExists(rowIndex, columnIndex)
        this.#map[rowIndex][columnIndex] = element
        return this
    }
    getMap(){
        return this.#map
    }
}

module.exports = MapForTurtle