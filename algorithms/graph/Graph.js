const Edge = require("./Edge")
const Vercel = require("./Vercel")

class AbstractGraph {
    constructor(){
        if (this.constructor == AbstractGraph) {
            throw new Error('Abstract classes can\'t be instantiated.');
          }
    }
    getEdgeCount(){
        throw new Error('Method must be implemented.');
    }
    getVercelCount(){
        throw new Error('Method must be implemented.');
    }
    addVercel(vercel){
        throw new Error('Method must be implemented.');
    }
    addPoint(title){
        throw new Error('Method must be implemented.');
    }
    createEdge(v1, v2, options = null){
        throw new Error('Method must be implemented.');
    }
    getVercelByTitle(title){
        throw new Error('Method must be implemented.');
    }
    getEdgesByVercelTitle(title){
        throw new Error('Method must be implemented.');
    }
    apply(alg){
        throw new Error('Method must be implemented.');
    }
    getVercels(){
        throw new Error('Method must be implemented.');
    }
    getEdges(){
        throw new Error('Method must be implemented.');
    }
    addVercelsTitlesSet(vercelsArray){
        throw new Error('Method must be implemented.');
    }
    defineEdges(strArray){
        throw new Error('Method must be implemented.');
    }
}

class Graph extends AbstractGraph{
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

module.exports = {Graph, AbstractGraph}