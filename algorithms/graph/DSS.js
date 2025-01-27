const Stack = require("../stack");
const { AbstractGraph } = require("./Graph");

class DSS {
  #used = [];
  #vercels = [];
  #vercelsStack = new Stack();
  #from = null;
  #to = null;
  #type = null;
  #toVercel = null;
  /**
   * Метод применяет алгоритм на граф. Алгоритм глубокого поиска отвечает на 2 заданные задачи:
   * 1) Можно ли достичь определенной точки, исходя из другой заданной в опциях точки в типе available
   * 2) Какие точки вообще можно обойти, если начинает с точки from в типе overall
   * @param {AbstractGraph} graph
   * @param {{type: 'overall'|'available', from: string, to?: string}} task
   */
  execute(graph, task) {
    let modifiedTask = this.#checkTaskAndSetDefault(graph, task);
    this.#validate(graph, modifiedTask);
    this.#prepearToAlg();
    this.#setToInnerStateFrom(graph, modifiedTask);
    if (this.#vercels.length < 1) {
      throw new Error("В графе должна быть хотя бы 1 вершина");
    }
    switch (this.#type) {
      case "overall": {
        return this.#computeOverall(this.#from);
      }
      case "available": {
        return this.#computeAvailable(this.#from);
      }
      default: {
        throw new Error("Подобный тип алгоритма еще не был рализован");
      }
    }
  }
  #prepearToAlg() {
    this.#used = [];
    this.#from = null;
    this.#to = null;
    this.#type = null;
    this.#toVercel = null;
    this.#vercelsStack = new Stack();
  }
  #setToInnerStateFrom(graph, task) {
    this.#vercels = graph.getVercels();
    let { from, to, type } = task;
    this.#from = from;
    if (to) {
      this.#to = to ? to : this.#to;
      this.#toVercel = this.#vercels.find((ver) => ver.getTitle() === this.#to);
    }
    this.#type = type;
  }
  #computeOverall(from) {
    if (this.#toVercel && this.#used.includes(this.#toVercel)) {
      return this.#used;
    }
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
  #computeAvailable(from) {
    this.#computeOverall(from);
    return this.#used.includes(this.#toVercel);
  }
  #checkTaskAndSetDefault(graph, task) {
    if (!task) {
      return {
        from: graph.getVercels()[0].getTitle(),
        type: "overall",
      };
    }
    if (!task.type) {
      return {
        from: task.from,
        type: "overall",
      };
    }
    if (!task.from) {
      return {
        from: graph.getVercels()[0].getTitle(),
        type: task.type,
      };
    }
    return task;
  }

  #validate(graph, task) {
    this.#checkInstanceOfGraph(graph);
    this.#checkTaskType(task)
    this.#checkVercelsExistenceInTask(graph, task)
  }
  #checkInstanceOfGraph(graph) {
    if (!(graph instanceof AbstractGraph)) {
      throw new Error(
        "Граф не соответствует требуемому интерфейсу AbstractGraph"
      );
    }
  }
  #checkVercelsExistenceInTask(graph, task){
    const {from, to} = task
    try{
      graph.getVercelByTitle(from)
      if (task.type === 'available'){
        graph.getVercelByTitle(to)
      }
    }
    catch(e){
      throw new Error('Запрашиваемых алгоритмом вершин или одной из них не существует.', {cause: e})
    }
  }
  #checkTaskType(task){
    if (task.type !== 'available' && task.type !== 'overall'){
      throw new Error("Неизвестная алгоритмическая задача. Допускаются только overall и available")
    }
  }
}

module.exports = DSS;
