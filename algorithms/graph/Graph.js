class Graph{
    #edges = []
    #vercels = []
    getEdgeCount(){
        return this.#edges.length
    }
    getVercelCount(){
        return this.#vercels.length
    }
    addVercel(vercel){
        this.#vercels.push(vercel)
        return this
    }
}

module.exports = Graph