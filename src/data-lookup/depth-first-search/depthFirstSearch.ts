export type TreeNode<T> = {
  value: T
  children?: TreeNode<T>[]
}

/**
 * A simple implementation of Depth-First search algorithm allowing a callback to handle what's found
 * @param node The node we're traversing
 * @param callback The callback from every value found
 */
export function depthFirstSearch<T>(
  node: TreeNode<T>,
  callback: (value: T) => void
) {
  callback(node.value)
  if (node.children) {
    for (const child of node.children) {
      depthFirstSearch(child, callback)
    }
  }
}
