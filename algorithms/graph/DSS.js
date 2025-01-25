const Graph = require("./Graph");

class DSS {
  #used = [];
  #vercels = [];
  #vercelsStack = []
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
    if (this.#vercels.length < 1){
        throw new Error('В графе должна быть хотя бы 1 вершина')
    }
   this.#checkTaskAndSetDefault(task)
    switch(task.type){
        case 'overall': {
          this.#computeOverall()
          break
        }
        case 'available': {

            break
        }
        default: {
            throw new Error('Подобный тип алгоритма еще не был рализован')
        }
    }
    // Начинаем с заданной точки
    // Вносим точку в список посещенных
    // Создаем стек переходов. Сначала первая точка там, потом первый сосед
    // Смотрим у точки соседей, начиная с первого
    // Вносим в список посещенных
    // Переходим в соседа и кидаем его в стек
    // Смотрим его соседей
    // Если есть непосещенный сосед, то идем в него
    // Если все соседи посещены, то убираем из стека точку и опускаемся вниз по стеку
    // Проходим по уже посещенной точке по соседям и находим непосещенные
    // Повторяем, пока не очистится стек
    // Список посещенных точек будет показывать, какие точки можно будет посетить из исходящей
  }
  #prepearToAlg() {
    this.#used = [];
  }
  #setToInnerStateFrom(graph) {
    this.#vercels = graph.getVercels();
  }
  #computeOverall(){

  }
  #checkTaskAndSetDefault(task){
    if (!task){
      task = {
          from: this.#vercels[0].getTitle(),
          type: 'overall'
      }
  }
  }
}

module.exports = DSS;
