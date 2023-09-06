/**
 * Allow the creation of property into an object based on name and type only
 */
export type CreateObjectFromProperty<Name extends string, TypeName> = Name extends string ? { [K in Name]: TypeName } : never
