const Edge = require("./Edge")

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
    createEdge(v1, v2){
        if (this.#vercels.includes(v1) && this.#vercels.includes(v2)){
            const edge = new Edge(v1, v2)
            this.#edges.push(edge)
            return this
        }
        throw new Error('Переданные вершины не входят в состав графа')
    }
}

module.exports = Graph