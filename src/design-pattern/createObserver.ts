export type Listener<T> = (data: T) => void;

export function createObserver<T>() {
  const listeners: Listener<T>[] = [];

  function subscribe(listener: Listener<T>) {
    listeners.push(listener);
  }

  function unsubscribe(listener: Listener<T>) {
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  function notify(data: T) {
    for (const listener of listeners) {
      listener(data);
    }
  }

  return { subscribe, unsubscribe, notify };
}
