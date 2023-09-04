export function ofType<T>() {
  return (match: T) => match
}
