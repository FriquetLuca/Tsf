/**
 * Loop every element of an array in the backward order. If the `predicate` is true, then `exec` will be executed and the returned value from it will determine if we break from the loop or not.
 * @param array The array
 * @param exec The function to execute if the `predicate` is undefined or it's execution is true
 * @param predicate The predicate
 * @returns The current array we're loop through
 */
export function forArrayBackward<U, T extends U[]>(array: T, exec: (item: U, index: number, array: T) => void|boolean, predicate?: (item: U, index: number, array: T) => boolean) {
  if(predicate) {
    for(let i = array.length - 1; i >= 0; i--) {
      const currElem = array[i]
      if(predicate(currElem as U, i, array)) {
        if(exec(currElem as U, i, array) === true) {
          break;
        }
      }
    }
  } else {
    for(let i = array.length - 1; i >= 0; i--) {
      if(exec(array[i] as U, i, array) === true) {
        break;
      }
    }
  }
  return array
}
