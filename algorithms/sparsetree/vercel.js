class SparseVercel {
    #sum
    #parent
    #range
    #rightChild
    #leftChild
    #index
    constructor(range){
        this.#range = range
    }
    defineParent(vercel){
        this.#parent = vercel
        return this         
    }
    defineChildrenAndSetParrent(c1, c2){
        this.#leftChild = c1 ? c1 : null
        this.#rightChild = c2 ? c2 : null
        if(this.#leftChild){
            this.#leftChild.defineParent(this)
        }
        if(this.#rightChild){
            this.#rightChild.defineParent(this)
        }
        return this
    }
    getChilds(){
        return {
            left: this.#leftChild,
            right: this.#rightChild
        }
    }
    getSum(){
        return this.#sum ? this.#sum : 0
    }
    calculateSum(){
        if (!this.#leftChild && ! this.#rightChild){
            throw new Error("Нет детей для расчёта суммы")
        }
        this.#sum = (this.#leftChild?.getSum() || 0) + (this.#rightChild?.getSum() || 0)
        return this
    }
    defineSum(value){
        this.#sum = value
        return this
    }
    getParent(){
        return this.#parent
    }
    setIndex(index){
        this.#index = index
        return this
    }
    getRange(){
        let [from, to] = this.#range.split(':')
        if (!to){
            to = from
        }
        return {
            from: Number(from), to: Number(to)
        }
    }
    setIndex(index){
        this.#index = index
        return this
    }
    getIndex(){
        return this.#index
    }
}

module.exports = SparseVercel