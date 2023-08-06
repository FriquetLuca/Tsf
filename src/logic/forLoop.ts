export function forLoop(initialIndex: number, predicate: (index: number) => boolean, exec: () => void, newIndex?: (index: number) => number) {
  for(let i = initialIndex; predicate(i); i = newIndex ? newIndex(i) : i + 1) {
    exec();
  }
}

export async function forLoopAsync(initialIndex: number, predicate: (index: number) => boolean, exec: () => Promise<void>, newIndex?: (index: number) => number) {
  for(let i = initialIndex; predicate(i); i = newIndex ? newIndex(i) : i + 1) {
    await exec();
  }
}
