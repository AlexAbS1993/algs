const Graph = require("../../algorithms/graph/Graph")

describe('Graph является совокупностью Vercel и Edge', () => {
    let graph
    beforeEach(() => {
        graph = new Graph()
    })
    test('Свежесозданный граф не содержит ни точек, ни рёбер', () => {
        expect(graph.getEdgeCount()).toBe(0)
        expect(graph.getVercelCount()).toBe(0)
    })
})