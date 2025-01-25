class Stack {
    #stack = []
    push(entitie){
        this.#stack.push(entitie)
        return this
    }
    pop(){
        this.#stack.pop()
        return this
    }
    length(){
        return this.#stack.length
    }
    get(){
        return this.#stack[this.#stack.length-1]
    }
}

module.exports = Stack