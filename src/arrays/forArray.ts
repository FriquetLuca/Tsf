export function forArrayForward<T extends unknown[]>(array: T, exec: (item: T[keyof T], index: number, array: T) => void|boolean, predicate?: (index: number, array: T) => boolean) {
  if(predicate) {
    for(let i = 0; i < array.length; i++) {
      if(predicate(i, array)) {
        if(exec(array[i] as T[keyof T], i, array) === true) {
          break;
        }
      }
    }
  } else {
    for(let i = 0; i < array.length; i++) {
      if(exec(array[i] as T[keyof T], i, array) === true) {
        break;
      }
    }
  }
  return array
}

export function forArrayBackward<T extends unknown[]>(array: T, exec: (item: T[keyof T], index: number, array: T) => void|boolean, predicate?: (index: number, array: T) => boolean) {
  if(predicate) {
    for(let i = array.length - 1; i >= 0; i--) {
      if(predicate(i, array)) {
        if(exec(array[i] as T[keyof T], i, array) === true) {
          break;
        }
      }
    }
  } else {
    for(let i = array.length - 1; i >= 0; i--) {
      if(exec(array[i] as T[keyof T], i, array) === true) {
        break;
      }
    }
  }
  return array
}
