const Heap = require("../../algorithms/heap/heap");

describe("Бинарная куча – структура данных для хранения объектов в виде дерева. Она работает по определённым правилам расположения и использует в качестве родительской структуры области в памяти - массив", () => {
  let heap = new Heap();
  const mockArray = [10, 3, 1, 5, 2, 4, 0];
  beforeEach(() => {
    heap = new Heap();
    heap.heapify(mockArray);
  });
  test("После создания кучи ее необходимо инициализировать с помощью метода heapify", () => {
    let arr = heap.toArray();
    expect(arr).toEqual([0, 2, 1, 5, 3, 4, 10]);
  });
  test("Куча может возвращать минимальное значение", () => {
    expect(heap.getMin()).toBe(0);
  });
  test("Куча может извлекать минимальное значение, не нарушая целостности", () => {
    let min = heap.extractMin();
    expect(min).toBe(0);
    expect(heap.getMin()).toBe(1);
  });
  test("Куча поддерживает сортировку массивов", () => {
    let sortedArray = heap.heapSort();
    expect(sortedArray).toEqual([0, 1, 2, 3, 4, 5, 10]);
  });
  test("Произвольный тест кучи с рандомными значениями", () => {
    let mockArray = [102, 144, 2, -22, 33, 5, 1001, 24, 144, 11, 545];
    let jsSort = [...mockArray].sort((a, b) => a - b);
    let heap = new Heap();
    heap.heapify(mockArray);
    let heapSort = heap.heapSort();
    expect(heapSort).toEqual(jsSort);
  });
  test("Тесты кучи на 10 рандомных массивах", () => {
    for (let i = 0; i < 10; i++) {
      let mockArray = new Array(20).fill(0).map((value) => {
        return Math.floor(Math.random() * 100);
      });
      let jsSort = [...mockArray].sort((a, b) => a - b);
      let heap = new Heap();
      heap.heapify(mockArray);
      let heapSort = heap.heapSort();
      expect(heapSort).toEqual(jsSort);
    }
  });
  // test("Не работает", () => {
  //   let mockArray = [
  //     0, 21, 77, 62, 84, 21, 64, 2, 69, 56, 52, 90, 0, 1, 64, 92, 68, 47, 28,
  //     71,
  //   ];
  //   let heap = new Heap();
  //   heap.heapify(mockArray);
  //   let heapSort = heap.heapSort();
  //   console.log("");
  // });
});
