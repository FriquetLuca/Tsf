import { ZodType, z } from "zod";

type Collapse<T> = 
  T extends (...args: any[]) => any
    ? T
    : T extends object
      ? { [K in keyof T]: Collapse<T[K]> }
      : T
type Unpack<T> = T extends (infer A)[] ? A : T;
type NewProp<TypeName, Name extends string> = Name extends string ? { [K in Name]: TypeName } : never;
type ExtractParams<Tag extends string, T extends Record<string, (match: z.infer<any>) => z.SafeParseReturnType<any, any>>>
= { [K in keyof T]: NewProp<K, Tag> & (Unpack<Parameters<T[K]>>) };
type ExtractValues<T> = T[keyof T]

export type makeADT<Tag extends string> = typeof makeADT<Tag>
export function makeADT<Tag extends string>(type: Tag) {
  return function <Matchers extends Record<string, (match: z.infer<any>) => z.SafeParseReturnType<any, any>>>(_ADTMatcher: Collapse<Matchers>) {
    let ofTypeObj = {};
    for(const matcherName in _ADTMatcher) {
      const newProp = {
          [matcherName]: (...anyParams: unknown[]) => {
            const adtType = {
              [type]: matcherName
            }
            return anyParams.reduce((prev, curr) => {
              return {
                ...(prev as object),
                ...(curr as object)
              }
            }, adtType)
        }
      }
      ofTypeObj = { ...ofTypeObj, ...newProp }
    }
    return {
      of: ofTypeObj as { [K in keyof Matchers]: (...args: Parameters<Matchers[K]>) => Collapse<NewProp<K, Tag> & Unpack<Parameters<Matchers[K]>>> },
      match: function <ADTFunctionRecords extends { [K in keyof Matchers]: (...args: Parameters<Matchers[K]>) => any }>(_ADTFunc: Collapse<ADTFunctionRecords>) {
        return function <ADTMappedValues extends ExtractValues<ExtractParams<Tag, Matchers>>>(_ADTValue: Collapse<ADTMappedValues>, ignoreError: boolean = false) {
          const currentADTType = _ADTValue[type];
          if(!ignoreError) {
            const tryMatch = _ADTMatcher[currentADTType](_ADTValue);
            if(!tryMatch.success) {
              throw tryMatch.error
            }
          }
          return _ADTFunc[currentADTType](_ADTValue) as ReturnType<ADTFunctionRecords[ADTMappedValues[Tag]]>
        }
      }
    }
  };
}

export function safeType<T extends ZodType<any, any, any>>(schema: T) {
  return (match: z.infer<T>) => schema.safeParse(match);
}
