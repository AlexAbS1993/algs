class Edge {
    #v1
    #v2
    #weight = null
    #weigthMeasure = ''
    #direction = 'both'
    #available_directions = ['both', '1to0', '0to1']
    constructor(vercel1, vercel2){
        this.#v1 = vercel1
        this.#v2 = vercel2
    }
    getVercels(){
        return [
            this.#v1,
            this.#v2
        ]
    }
    getSettings(){
        return {
            weight: this.#weight,
            direction: this.#direction,
            weight_measure: this.#weigthMeasure
        }
    }
    setDirection(dir){
        if (!this.#available_directions.includes(dir)){
            throw new Error('Недопустимое значение направления')
        }
        this.#direction = dir
        return this
    }
    setWeight(weight){
        if (typeof weight !== 'number'){
            throw new Error('Недопустимый тип веса ребра')
        }
        this.#weight = weight
        return this
    }
    setWeightMeasure(postfix){
        if (typeof postfix !== 'string'){
            throw new Error('Недопустимый тип значения веса ребра')
        }
        this.#weigthMeasure = postfix
        return this
    }
}

module.exports = Edge