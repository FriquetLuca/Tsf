export type DependencyItem<T> = {
  /**
   * Name of the dependency.
   */
  name: string,
  /**
   * The data content of the dependency.
   */
  content: T,
  /**
   * The required name of the dependencies of this dependency.
   */
  required?: string[]
}

/**
 * Sort an array of dependency item by their dependence (it's a topological sort)
 * @param datas The datas to sort
 * @returns The topologicaly sorted data
 */
export function topologicalSort<T>(datas: DependencyItem<T>[]) {
  const nodeMap: { [label: string]: DependencyItem<T> } = {};
  for (const data of datas) {
      nodeMap[data.name] = data;
  }
  const sorted: DependencyItem<T>[] = [];
  const visited = new Set();
  function visitNode(node: DependencyItem<T>) {
    if (!node || visited.has(node.name) || !nodeMap[node.name]) {
      return
    }
    visited.add(node.name)
    for (const dependency of node.required || []) {
      visitNode(nodeMap[dependency])
    }
    sorted.push(node)
  }
  for (const data of datas) {
    visitNode(data)
  }
  return sorted
}
