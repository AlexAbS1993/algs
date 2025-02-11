/**
 * Класс используется в Btree и представляет собой набор из значений и их количества
 */
class Element {
    #value
    #count
    constructor(value){
        this.#value = value
        this.#count = 1
    }
    increaseCount(){
        this.#count++
        return this
    }
    decreaseCount(){
        this.#count--
        return this
    }
    getCount(){
        return this.#count
    }
    getValue(){
        return this.#value
    }
    isReadyToDelete(){
        return this.#count <= 0
    }
}

module.exports = Element