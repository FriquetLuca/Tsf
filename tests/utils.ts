type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
export const assertType = <A, B>(testName: string, test: Equal<A, B>) => {
  if(!test) {
    throw new Error(`Error: ${testName} > false`);
  }
  return true;
};
