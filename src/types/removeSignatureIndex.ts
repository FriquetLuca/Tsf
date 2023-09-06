/**
* Remove the signature index from a type as such: `{ [key: string]: any; foo(): void; }` => `{ foo(): void }`
*/
export type RemoveSignatureIndex<T> = { [Key in keyof T as Key extends `${infer ConcreteKey}` ? ConcreteKey : never ]: T[Key] }
