class BinaryElement {
    #parent
    #leftChild
    #rightChild
    #value
    constructor(value){
        this.#value = value
    }
    getValue(){
        return this.#value
    }
    getLeftChild(){
        if(!this.isLeftChildExists()){
            throw new Error('Левого потомка не существует')
        }
        return this.#leftChild
    }
    getRightChild(){
        if(!this.isRightChildExists()){
            throw new Error('Правого потомка не существует')
        }
        return this.#rightChild
    }
    getParent(){
        return this.#parent
    }   
    #addParent(element){
        this.#validateElementType(element)
        this.#parent = element
        return this
    }
    addLeftChild(element){
        this.#validateElementType(element)
        this.#leftChild = element
        element.#addParent(this)
        return this
    }
    addRightChild(element){
        this.#validateElementType(element)
        this.#rightChild = element
        element.#addParent(this)
        return this
    }
    isRightChildExists(){
        return Boolean(this.#rightChild)
    }
    isLeftChildExists(){
        return Boolean(this.#leftChild)
    }
    isParentExists(){
        return Boolean(this.#parent)
    }
    #validateElementType(element){
        if (element instanceof BinaryElement){
            return
        }
        throw new Error('В качестве ребёнка или родителя может выступать только инстанс binaryElement')
    }
}

module.exports = BinaryElement