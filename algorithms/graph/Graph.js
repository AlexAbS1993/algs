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
    getVercelByTitle(title){
        let vercel = this.#vercels.find(ver => ver.getTitle() === title)
        if (vercel == null){
            throw new Error('Нет такой вершины')
        }
        return vercel
    }
    getEdgesByVercelTitle(title){
        let vercel = this.getVercelByTitle(title)
        let result = []
        this.#edges.forEach(edge => {
            if(edge.getVercels().includes(vercel)){
                result.push(edge)
            }
        })
        return result
    }
    apply(alg){
        return alg.execute(this)
    }
}

module.exports = Graph