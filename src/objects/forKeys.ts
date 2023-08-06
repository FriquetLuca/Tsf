export function forKeys<T extends object>(obj: T, exec: (item: T[keyof T], property: keyof T, obj: T) => void|boolean, predicate?: (property: keyof T, obj: T) => boolean) {
  if(predicate) {
    for(const property in obj) {
      if(predicate(property, obj)) {
        if(exec(obj[property], property, obj) === true) {
          break;
        }
      }
    }
  } else {
    for(const property in obj) {
      if(exec(obj[property], property, obj) === true) {
        break;
      }
    }
  }
}

export async function forKeysAsync<T extends object>(obj: T, exec: (item: T[keyof T], property: keyof T, obj: T) => Promise<void|boolean>, predicate?: (property: keyof T, obj: T) => Promise<boolean>) {
  if(predicate) {
    for(const property in obj) {
      if(await predicate(property, obj)) {
        if(await exec(obj[property], property, obj) === true) {
          break;
        }
      }
    }
  } else {
    for(const property in obj) {
      if(await exec(obj[property], property, obj) === true) {
        break;
      }
    }
  }
}
