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
    },
    {
      type: "normal",
      title: "Sort items by dependency using a topological sort",
      expect: () => {
        return tsf.topologicalSort([
          
          {
            name: "Five",
            content: 5,
            required: ["Three", "Four"]
          },
          {
            name: "Three",
            content: 3,
            required: ["One", "Two"]
          },
          {
            name: "Two",
            content: 2,
            required: ["One"]
          },
          {
            name: "Six",
            content: 6,
            required: ["Two", "Four", "One", "Five"]
          },
          {
            name: "Four",
            content: 4,
            required: ["Three"]
          },
          {
            name: "One",
            content: 1
          }
        ]).map(item => item.content)
      },
      equal: [1, 2, 3, 4, 5, 6]
    }
  ]
})
