class MapForTurtle {
    #rows
    #collumns
    #map
    constructor(xCount, yCount){
        this.#rows = xCount
        this.#collumns = yCount
        this.#createEmptyMap()
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

    }
    static createRandomMap(xCount, yCount){

    }
    point(x, y){
        let rowsIndex = x - 1
        let collumnsIndex = y - 1
        let result = this.#map[rowsIndex]?.[collumnsIndex] 
        if (!result){
             throw new Error('Нет такого значения')
        }
        return result
    }
    getInfo(){
        return {
            rows: this.#rows,
            collumns: this.#collumns,
            grid: `${this.#rows}x${this.#collumns}`
        }
    }
}

module.exports = MapForTurtle