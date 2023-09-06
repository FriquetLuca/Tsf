import type { z } from "zod"
import type { Collapse, CreateObjectFromProperty, Unpack, GetObjectValues } from "../../types"

type ExtractMatcherParams<
  Tag extends string,
  T extends Record<string, (match: z.infer<any>) => z.SafeParseReturnType<any, any>>
> = {
  [K in keyof T]: CreateObjectFromProperty<Tag, K> & Unpack<Parameters<T[K]>>
}

type MatcherDictionary = Record<string, (match: z.infer<any>) => z.SafeParseReturnType<any, any>>

type OfType<Tag extends string, T extends object> = { [K in keyof T]: (...args: Parameters<T[K]>) => Collapse<CreateObjectFromProperty<Tag, K> & Unpack<Parameters<T[K]>>> }

export type adtFactory<Tag extends string> = typeof adtFactory<Tag>
export function adtFactory<Tag extends string>(type: Tag) {
  const generator = <Matchers extends MatcherDictionary>(_ADTMatcher: Collapse<Matchers>) => {
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
      of: { ...ofTypeObj } as OfType<Tag, Matchers>,
      match: <ADTFunctionRecords extends { [K in keyof Matchers]: (...args: Parameters<Matchers[K]>) => unknown }>(_ADTFunc: Collapse<ADTFunctionRecords>) => {
        return <ADTMappedValues extends GetObjectValues<ExtractMatcherParams<Tag, Matchers>>>(_ADTValue: Collapse<ADTMappedValues>, ignoreError: boolean = false) => {
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
  }
  return generator
}