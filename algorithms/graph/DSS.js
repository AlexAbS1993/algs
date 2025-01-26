const Stack = require("../stack");
const Graph = require("./Graph");

class DSS {
  #used = [];
  #vercels = [];
  #vercelsStack = new Stack();
  /**
   * Метод применяет алгоритм на граф. Алгоритм глубокого поиска отвечает на 2 заданные задачи:
   * 1) Можно ли достичь определенной точки, исходя из другой заданной в опциях точки в типе available
   * 2) Какие точки вообще можно обойти, если начинает с точки from в типе overall
   * @param {Graph} graph
   * @param {{type: 'overall'|'available', from: string, to?: string}} task
   */
  execute(graph, task) {
    this.#prepearToAlg();
    this.#setToInnerStateFrom(graph);
    if (this.#vercels.length < 1) {
      throw new Error("В графе должна быть хотя бы 1 вершина");
    }
    task =this.#checkTaskAndSetDefault(task);
    switch (task.type) {
      case "overall": {
        return this.#computeOverall(task.from);
      }
      case "available": {
        break;
      }
      default: {
        throw new Error("Подобный тип алгоритма еще не был рализован");
      }
    }
  }
  #prepearToAlg() {
    this.#used = [];
  }
  #setToInnerStateFrom(graph) {
    this.#vercels = graph.getVercels();
  }
  #computeOverall(from) {
    // Начинаем с заданной точки
    let vercel = this.#vercels.find((ver) => ver.getTitle() === from);
    // Если точка не посещена
    if (!this.#used.includes(vercel)) {
      // Вносим точку в список посещенных
      this.#used.push(vercel);
      // Создаем стек переходов. Сначала первая точка там, потом первый сосед
      this.#vercelsStack.push(vercel);
    }
    // Смотрим у точки соседей, начиная с первого
    let nighbourds = this.#vercelsStack.get().getNighbourds();
    for (let n of nighbourds) {
      if (!this.#used.includes(n)) {
        return this.#computeOverall(n.getTitle());
      }
    }
    this.#vercelsStack.pop();
    if (this.#vercelsStack.length() === 0) {
      return this.#used;
    } else {
      return this.#computeOverall(this.#vercelsStack.get().getTitle());
    }
  }

  #checkTaskAndSetDefault(task) {
    if (!task) {
      return {
        from: this.#vercels[0].getTitle(),
        type: "overall",
      };
    }
    if(!task.type){
      return {
        from: task.from,
        type: 'overall'
      }
    }
    if(!task.from){
      return {
        from: this.#vercels[0].getTitle(),
        type: task.type
      }
    }
  }
}

module.exports = DSS;
