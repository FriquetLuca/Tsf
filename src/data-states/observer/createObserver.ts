export type Listener<T> = (data: T) => void
export type Observer<T> = {
  subscribe: (listener: Listener<T>) => void
  unsubscribe: (listener: Listener<T>) => void
  notify: (data: T) => void
}
/**
 * Create an observer from which you can subscribe listener and notify them later
 * @returns An observer waiting for a notification
 */
export function createObserver<T>() {
  const listeners: Listener<T>[] = []
  return {
    subscribe: (listener: Listener<T>) => {
      listeners.push(listener);
    },
    unsubscribe: (listener: Listener<T>) => {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    },
    notify: (data: T) => {
      for (const listener of listeners) {
        listener(data);
      }
    }
  } as Observer<T>
}
