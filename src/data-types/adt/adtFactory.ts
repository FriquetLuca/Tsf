import type { z } from "zod"
import type { Collapse, CreateObjectFromProperty, Unpack, GetObjectValues } from "../../types"

type ExtractMatcherParams<
  Tag extends string,
  T extends Record<string, (match: z.infer<any>) => z.SafeParseReturnType<any, any>>
> = {
  [K in keyof T]: CreateObjectFromProperty<Tag, K> & Unpack<Parameters<T[K]>>
}

export type MatcherDictionary = Record<string, (match: z.infer<any>) => z.SafeParseReturnType<any, any>>

type TypeofADT<Tag extends string, T extends object, K extends keyof T> = CreateObjectFromProperty<Tag, K> & Collapse<Unpack<Parameters<T[K] extends (...args: any) => any ? Parameters<T[K]> : never>>>;

export type MatcherRecords<Matchers extends MatcherDictionary> = { [K in keyof Matchers]: (...args: Parameters<Matchers[K]>) => unknown }

export type ADTOfType<Tag extends string, T extends object> = { [K in keyof T]: (...args: T[K] extends (...args: any) => any ? Parameters<T[K]> : never) => TypeofADT<Tag, T, K> }

export type ADTMatchingType<Tag extends string, Matchers extends MatcherDictionary> = <ADTFunctionRecords extends MatcherRecords<Matchers>>(_ADTFunc: Collapse<ADTFunctionRecords>) => ADTMatcher<Tag, Matchers, ADTFunctionRecords>

export type ADTMatcher<Tag extends string, Matchers extends MatcherDictionary, ADTFunctionRecords extends MatcherRecords<Matchers>> = <ADTMappedValues extends GetObjectValues<ExtractMatcherParams<Tag, Matchers>>>(_ADTValue: Collapse<ADTMappedValues>, ignoreError?: boolean) => ReturnType<ADTFunctionRecords[ADTMappedValues[Tag]]>;

export type adtFactory<Tag extends string> = <Matchers extends MatcherDictionary>(_ADTMatcher: Collapse<Matchers>) => {
  of: ADTOfType<Tag, Matchers>
  match: ADTMatchingType<Tag, Matchers>
}

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
      of: { ...ofTypeObj } as ADTOfType<Tag, Matchers>,
      match: <ADTFunctionRecords extends { [K in keyof Matchers]: (...args: Parameters<Matchers[K]>) => unknown }>(_ADTFunc: Collapse<ADTFunctionRecords>) => {
        return <ADTMappedValues extends GetObjectValues<ExtractMatcherParams<Tag, Matchers>>>(_ADTValue: Collapse<ADTMappedValues>, ignoreError: boolean = false) => {
          const currentADTType = _ADTValue[type];
          if(!ignoreError) {
            const tryMatch = _ADTMatcher[currentADTType](_ADTValue)
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
