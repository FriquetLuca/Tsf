export type TreeNode<T> = {
  value: T
  children?: TreeNode<T>[]
}

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


// export function depthFirstSearch2<T>(myDatas: TreeNode<T>) {
//   const nodeMap: {[label: string]: RequiredOrder} = {};
//   for (const data of myDatas) {
//       nodeMap[data.name] = data;
//   }
//   const sorted: RequiredOrder[] = [];
//   const visited = new Set();
//   function visitNode(node: RequiredOrder) {
//       if (!node || visited.has(node.name) || !nodeMap[node.name]) {
//           return;
//       }
//       visited.add(node.name);
//       for (const dependency of node.required || []) {
//           visitNode(nodeMap[dependency]);
//       }
//       sorted.push(node);
//   }
//   for (const data of myDatas) {
//       visitNode(data);
//   }
//   return sorted;
// }