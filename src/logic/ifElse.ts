export function ifElse(test: boolean, ifTrue: () => void, ifFalse?: (() => void)|undefined) {
  if(test) {
    ifTrue()
  } else {
    ifFalse && ifFalse()
  }
}

export async function ifElseAsync(test: boolean, ifTrue: () => Promise<void>, ifFalse?: (() => Promise<void>)|undefined) {
  if(test) {
    await ifTrue()
  } else {
    ifFalse && await ifFalse()
  }
}
