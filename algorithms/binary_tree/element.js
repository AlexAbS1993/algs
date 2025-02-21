class BinaryElement {
    #parent
    #leftChild
    #rightChild
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
    addParent(element){
        this.#validateElementType()
        this.#parent = element
        return this
    }
    addLeftChild(element){
        this.#validateElementType()
        this.#leftChild = element
        return this
    }
    addRightChild(element){
        this.#validateElementType()
        this.#rightChild = element
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