const Edge = require("./Edge")
const Vercel = require("./Vercel")

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
    addPoint(title){
        let vercel = new Vercel(title)
        return this.addVercel(vercel)
    }
    createEdge(v1, v2, options = null){
        if (this.#vercels.includes(v1) && this.#vercels.includes(v2)){
            const edge = new Edge(v1, v2)
            this.#edges.push(edge)
            if (options){
                try{
                    this.#applyOptions(edge, options)
                }
                catch(e){
                    throw new Error(e.message, {cause: e})
                }
            }
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
    getVercels(){
        return this.#vercels
    }
    getEdges(){
        return this.#edges
    }
    #applyOptions(edge, options){
        if (options.dir){
            edge.setDirection(options.dir)
        }
        if (options.weight){
            edge.setWeight(options.weight)
        }
        if (options.weightMeasure){
            edge.setWeightMeasure(options.weightMeasure)
        }
        return
    }
    addVercelsTitlesSet(vercelsArray){
        let vercels = Array.from(new Set(vercelsArray))
        vercels.forEach(vercelTitle => {
            this.addPoint(vercelTitle)
        })
        return this
    }
    defineEdges(strArray){
        let parseStr = this.#parseStrEdges(strArray) 
    }
    #parseStrEdges(strArray){
        return strArray.map((description) => {
            let splittedArray = description.split(':')
            return this.createEdge(this.getVercelByTitle(splittedArray[0]), this.getVercelByTitle(splittedArray[1]))
        })
    }
}

module.exports = Graph