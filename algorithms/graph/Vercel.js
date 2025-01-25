class Vercel {
    #title
    #nighbourds = []
    constructor(title){
        this.#title = title
    }
    getTitle(){
        return this.#title
    }
    addNighbourd(vercel){
        this.#nighbourds.push(vercel)
        return this
    }
    nighbourdsCount(){
        return this.#nighbourds.length
    }
    isNighbourdWith(vercel){
        return this.#nighbourds.includes(vercel)
    }
    getNighbourds(){
        return this.#nighbourds
    }
}

module.exports = Vercel