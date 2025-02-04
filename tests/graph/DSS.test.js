const DSS = require("../../algorithms/graph/DSS");
const { Graph } = require("../../algorithms/graph/Graph");

describe(`DSS - алгоритм для поиска в глубину, отвечающий на вопросы: 
    1) Возможно ли добраться до конкретной точки;
    2) Какие точки включены в имеющийся граф `, () => {
  let dss;
  let mockGraph = new Graph();
  mockGraph
    .addPoint("A")
    .addPoint("B")
    .addPoint("C")
    .addPoint("D")
    .addPoint("E")
    .addPoint("F")
    .addPoint("G")
    .addPoint("Z")
    .addPoint("X")
    .addPoint("Y");
  mockGraph
    .createEdge(
      mockGraph.getVercelByTitle("A"),
      mockGraph.getVercelByTitle("B")
    )
    .createEdge(
      mockGraph.getVercelByTitle("B"),
      mockGraph.getVercelByTitle("C")
    )
    .createEdge(
      mockGraph.getVercelByTitle("B"),
      mockGraph.getVercelByTitle("D")
    )
    .createEdge(
      mockGraph.getVercelByTitle("C"),
      mockGraph.getVercelByTitle("D")
    )
    .createEdge(
      mockGraph.getVercelByTitle("C"),
      mockGraph.getVercelByTitle("E")
    )
    .createEdge(
      mockGraph.getVercelByTitle("C"),
      mockGraph.getVercelByTitle("F")
    )
    .createEdge(
      mockGraph.getVercelByTitle("F"),
      mockGraph.getVercelByTitle("E")
    )
    .createEdge(
      mockGraph.getVercelByTitle("G"),
      mockGraph.getVercelByTitle("F")
    )
    .createEdge(
      mockGraph.getVercelByTitle("A"),
      mockGraph.getVercelByTitle("F")
    )
    .createEdge(
      mockGraph.getVercelByTitle("Z"),
      mockGraph.getVercelByTitle("X")
    )
    .createEdge(
      mockGraph.getVercelByTitle("Y"),
      mockGraph.getVercelByTitle("Z")
    );
  beforeEach(() => {
    dss = new DSS();
  });
  test("Проверка работоспособности алгоритма при разных входных данных", () => {
    let reached = dss.execute(mockGraph);
    expect(reached.includes(mockGraph.getVercelByTitle("A"))).toBe(true);
    expect(reached.includes(mockGraph.getVercelByTitle("B"))).toBe(true);
    expect(reached.length).toBe(7);
    let reached2 = dss.execute(mockGraph, { from: "Z" });
    expect(reached2.includes(mockGraph.getVercelByTitle("Z"))).toBe(true);
    expect(reached2.includes(mockGraph.getVercelByTitle("Y"))).toBe(true);
    expect(reached2.includes(mockGraph.getVercelByTitle("X"))).toBe(true);
    expect(reached2.includes(mockGraph.getVercelByTitle("A"))).toBe(false);
    expect(reached2.length).toBe(3);
  });
  test("Алгоритм предлагает так же дать ответ на вопрос, а возможно ли с какой-либо точки добраться до другой точки", () => {
    let available = dss.execute(mockGraph, {
      from: "A",
      to: "F",
      type: "available",
    });
    expect(available).toBe(true);
  });
  test("Алгоритм выдает недоступность достижения точки, если нет высот, соединяющих ребрами эти точки", () => {
    let notAvailable = dss.execute(mockGraph, {
      from: "Z",
      to: "B",
      type: "available",
    });
    expect(notAvailable).toBe(false);
  });
  describe("Отказоустойчивые тесты Graph. Система правильно реагирует на ошибки", () => {
    test("Пробуем передавать в execute значения вершин, которых не существует. Ожидаем ошибку", () => {
      try {
        dss.execute(mockGraph, { from: "O", to: "F", type: "available" });
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toMatch("не существует");
      }
    });
    test("Пробуем передавать в execute неправильный граф, который не соответствует интерфейсу. Ожидаем ошибку", () => {
      try {
        dss.execute({ hello: 10 }, { from: "A", to: "F", type: "available" });
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toMatch(
          "Граф не соответствует требуемому интерфейсу"
        );
      }
    });
    test('Пробуем передать в опции execute несуществующий тип алгоритма. Ожидаем ошибку', ()=> {
        try{
            dss.execute(mockGraph, {from: "A", type: "binary_search"})
        }
        catch(e){
            expect(e).toBeDefined()
            expect(e.message).toMatch('Неизвестная алгоритмическая задача')
        }
    })
  });
});
