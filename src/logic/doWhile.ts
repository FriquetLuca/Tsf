export function doWhile(execDo: () => boolean) {
  let currentState;
  do {
    currentState = execDo()
  } while (currentState)
}

export async function doWhileAsync(execDo: () => Promise<boolean>) {
  let currentState;
  do {
    currentState = await execDo()
  } while (currentState)
}
