const SparseVercel = require("../../algorithms/sparsetree/vercel");

describe("Все элементы массива, входящего в систему sparseTree преобразуются в класс SparseVercel", () => {
  describe("SparseVercel включает в себя информацию об области покрытия", () => {
    test("При создании vercel типа leaf принимается 1 значение и определяет его во from и to", () => {
      let vercel = new SparseVercel("1");
      expect(vercel.getRange()).toStrictEqual({ from: 1, to: 1 });
    });
    test("При определении большего диапазона vercel отправляет данные по диапазону, предварительно спарсив строку n:r", () => {
      let ver2 = new SparseVercel("1:4");
      expect(ver2.getRange()).toStrictEqual({ from: 1, to: 4 });
    });
  });
  test("SparseVercel может принимать к себе детей и быть родителем", () => {
    let vercel = new SparseVercel("1:2");
    let verChild1 = new SparseVercel("1");
    let verChild2 = new SparseVercel("2");
    vercel.defineChildrenAndSetParrent(verChild1, verChild2);
    expect(vercel.getChilds()).toStrictEqual({
      left: verChild1,
      right: verChild2,
    });
    expect(verChild1.getParent()).toBe(vercel);
  });
  describe(`Подсчёт суммы в vercel ведётся по нескольким вариантам:
        - Устанавливается напрямую, если vercel является leaf;
        - Высчитывается из двух детей(или одного, если второго нет)
        `, () => {
    test("SparseVercel принимает в себя сумму-значение своего узла", () => {
      let vercel = new SparseVercel("0");
      vercel.defineSum(10);
      expect(vercel.getSum()).toBe(10);
    });
    test("После добавления детей к родителю, можно просчитать сумму для родителя", () => {
      let vercel = new SparseVercel("1:2");
      let verChild1 = new SparseVercel("1").defineSum(1);
      let verChild2 = new SparseVercel("2").defineSum(2);
      vercel.defineChildrenAndSetParrent(verChild1, verChild2);
      vercel.calculateSum();
      expect(vercel.getSum()).toBe(3);
    });
    test("При попытке подсчёта суммы родителя без детей, выдаётся ошибка", () => {
      let vercel = new SparseVercel("1");
      try {
        vercel.calculateSum();
      } catch (e) {
        expect(e).toBeDefined();
      }
    });
    test("Просчёт суммы без одного из детей работает так же, как с двумя, но вместо второго передаётся 0", () => {
      let vercel = new SparseVercel("1");
      let verChild1 = new SparseVercel("1").defineSum(4);
      vercel.defineChildrenAndSetParrent(verChild1);
      vercel.calculateSum();
      expect(vercel.getSum()).toBe(4);
    });
  });
});
