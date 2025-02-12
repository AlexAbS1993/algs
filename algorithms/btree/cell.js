const Element = require("./element")

class CellElement {
    element
    more
    less
    constructor(element){
        this.element = element
    }
    setMore(cell){
        this.more = cell
        return this
    }
    setLess(cell){
        this.less = cell
        return this
    }
}

class Cell{
    #degree
    #availableChildrensCount
    #availableParentsCount = 1
    #valuesArray = []
    #devideIndex = null
    #parent = null
    #overloadedElement = null
    constructor(degree){
        this.#degree = degree
        this.#availableChildrensCount = this.#degree+1
    }
    getInfo(){
        return {
            degree: this.#degree,
            availableChildrensCount:this.#availableChildrensCount,
            availableParentsCount:this.#availableParentsCount
        }
    }
    addValue(value){
        if(this.isOverload()){
            throw new Error('Нет возможности вставить элемент. Ячейка перегружена и её необходимо исправить')
        }
        if (value instanceof CellElement){
            this.#valuesArray.push(value)
        }
        else {
            this.#valuesArray.push(new CellElement(new Element(value)))
        }
        this.#valuesArray.sort((el1, el2) => el1.element.getValue() - el2.element.getValue())
        this.#checkOverloadAndFix()
        return this
    }
    isOverload(){
        return Boolean(this.#overloadedElement)
    }
    getOverloadMiddleElement(){
        return this.#overloadedElement
    }
    #checkOverloadAndFix(){
        if(this.#valuesArray.length > this.#degree){
            let middleIndex = Math.ceil((this.#valuesArray.length - 1)/2)
            this.#overloadedElement = this.#valuesArray[middleIndex]
            this.#devideIndex = middleIndex
            this.#valuesArray = [...this.#valuesArray.slice(0, middleIndex), ...this.#valuesArray.slice(middleIndex+1)]
        }
        return
    }
    getElementValueByOrder(order){
        let result = this.#valuesArray[order].element.getValue()
        if (!result){
            throw new Error('По данному order нет элемента')
        }
        return result
    }
    fix(){
        let less = Cell.createCellFromArray(this.#valuesArray.slice(0, this.#devideIndex), this.#degree)
        let more = Cell.createCellFromArray(this.#valuesArray.slice(this.#devideIndex), this.#degree)
        return {
            less, more, overloadedElement: this.#overloadedElement
        }
    }
    addLessChild(index, child){
        this.#valuesArray[index].less = child
        child.addParent(this)
        return this
    }
    addMoreChild(index, child){
        this.#valuesArray[index].more = child
        child.addParent(this)
        return this
    }
    getChilds(index){
        let cellElement = this.#valuesArray[index]
        return {less: cellElement.less, more: cellElement.more}
    }
    static createCellFromArray(elementsArray, degree){
        let cell = new Cell(degree)
        for (let el of elementsArray){
            cell.addValue(el)
        }
        return cell
    }
    addParent(cellElement){
        this.#parent = cellElement
        return this
    }
    getParent(){
        return this.#parent
    }
}

module.exports = Cell