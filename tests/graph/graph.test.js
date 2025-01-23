const Graph = require("../../algorithms/graph/Graph")
const Vercel = require("../../algorithms/graph/Vercel")

describe('Graph является совокупностью Vercel и Edge', () => {
    let graph
    beforeEach(() => {
        graph = new Graph()
    })
    test('Свежесозданный граф не содержит ни точек, ни рёбер', () => {
        expect(graph.getEdgeCount()).toBe(0)
        expect(graph.getVercelCount()).toBe(0)
    })
    test('Граф может включать в себя вершины', () => {
        const v1 = new Vercel('Moscow')
        graph.addVercel(v1)
        expect(graph.getVercelCount()).toBe(1)
    })
})