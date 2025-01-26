const DSS = require("../../algorithms/graph/DSS")
const Graph = require("../../algorithms/graph/Graph")

describe(`DSS - алгоритм для поиска в глубину, отвечающий на вопросы: 
    1) Возможно ли добраться до конкретной точки;
    2) Какие точки включены в имеющийся граф `, () => {
        let dss
        let mockGraph = new Graph()
        mockGraph
        .addPoint('A')
        .addPoint('B')
        .addPoint('C')
        .addPoint('D')
        .addPoint('E')
        .addPoint('F')
        .addPoint('G')
        .addPoint('Z')
        .addPoint('X')
        .addPoint('Y')
        mockGraph.createEdge(mockGraph.getVercelByTitle('A'), mockGraph.getVercelByTitle('B'))
        .createEdge(mockGraph.getVercelByTitle('B'), mockGraph.getVercelByTitle('C'))
        .createEdge(mockGraph.getVercelByTitle('B'), mockGraph.getVercelByTitle('D'))
        .createEdge(mockGraph.getVercelByTitle('C'), mockGraph.getVercelByTitle('D'))
        .createEdge(mockGraph.getVercelByTitle('C'), mockGraph.getVercelByTitle('E'))
        .createEdge(mockGraph.getVercelByTitle('C'), mockGraph.getVercelByTitle('F'))
        .createEdge(mockGraph.getVercelByTitle('F'), mockGraph.getVercelByTitle('E'))
        .createEdge(mockGraph.getVercelByTitle('G'), mockGraph.getVercelByTitle('F'))
        .createEdge(mockGraph.getVercelByTitle('A'), mockGraph.getVercelByTitle('F'))
        .createEdge(mockGraph.getVercelByTitle('Z'), mockGraph.getVercelByTitle('X'))
        .createEdge(mockGraph.getVercelByTitle('Y'), mockGraph.getVercelByTitle('Z'))
        beforeEach(() => {
            dss = new DSS()
        })
        test('test', () => {
            let reached = dss.execute(mockGraph)
            expect(reached.includes(mockGraph.getVercelByTitle('A'))).toBe(true)
            expect(reached.includes(mockGraph.getVercelByTitle('B'))).toBe(true)
        })
    })