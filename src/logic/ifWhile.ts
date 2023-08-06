export function ifWhile(test: boolean, exec: () => boolean) {
  let currentState = test;
  while(currentState) {
    currentState = exec()
  }
}

export async function ifWhileAsync(test: boolean, exec: () => Promise<boolean>) {
  let currentState = test;
  while(currentState) {
    currentState = await exec()
  }
}
