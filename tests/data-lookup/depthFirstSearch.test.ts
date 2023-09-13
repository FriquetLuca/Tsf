import * as tsf from "../../src"
import { testPage } from "../tester"

testPage({
  title: "Depth-First Search",
  tests: [
    {
      type: "normal",
      title: "Look through the datas the same way a DFS algorithm should be",
      expect: () => {
        const result: number[] = []
        const tree: tsf.TreeNode<number> = {
          value: 1,
          children: [
            {
              value: 2,
              children: [
                { value: 4 },
                { value: 5 },
              ],
            },
            {
              value: 3,
              children: [
                { value: 6 },
                { value: 7 },
              ],
            },
          ],
        }
        tsf.depthFirstSearch(tree, (value) => {
          if(!result.includes(value)) {
            result.push(value)
          }
        })
        return result
      },
      equal: [1, 2, 4, 5, 3, 6, 7],
    }
  ]
})
