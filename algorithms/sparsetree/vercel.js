class Vercel {
    #sum
    #parent
    #range
    #rightChild
    #leftChild
    constructor(range){
        this.#range = range
    }
    defineParent(vercel){
        this.#parent = vercel
        return this         
    }
    defineChildren(c1, c2){
        this.#leftChild = c1 ? c1 : null
        this.#rightChild = c2 ? c2 : null
        return this
    }
    getSum(){
        return this.#sum ? this.#sum : 0
    }
    calculateSum(){
        this.#sum = this.#leftChild.getSum() + this.#rightChild.getSum()
    }
    defineSum(value){
        this.#sum = value
        return this
    }
    getParent(){
        return this.#parent
    }
}