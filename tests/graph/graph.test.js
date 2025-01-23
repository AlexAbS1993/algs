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
    test('Граф может создавать связи в виде рёбер', () => {
        const v1 = new Vercel('Moscow')
        const v2 = new Vercel('Tambov')
        graph
        .addVercel(v1)
        .addVercel(v2)
        .createEdge(v1, v2)
        expect(graph.getVercelCount()).toBe(2)
        expect(graph.getEdgeCount()).toBe(1)
    })
    test('Граф выдает ошибку, если передать связь несуществующей вершины', () => {
        const v1 = new Vercel('Moscow')
        const v2 = new Vercel('Tambov')
        graph
        .addVercel(v1)
        try{
            graph.createEdge(v1, v2)
        }
        catch(e){
            expect(e).toBeDefined()
        }
    })
})