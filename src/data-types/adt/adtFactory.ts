import type { z } from "zod"
import type { Collapse, CreateObjectFromProperty, Unpack, GetObjectValues } from "../../types"

type ExtractMatcherParams<
  Tag extends string,
  T extends Record<string, (match: z.infer<any>) => z.SafeParseReturnType<any, any>>
> = {
  [K in keyof T]: CreateObjectFromProperty<Tag, K> & Unpack<Parameters<T[K]>>
}

export type MatcherDictionary = Record<string, (match: z.infer<any>) => z.SafeParseReturnType<any, any>>

type MatcherParams<T extends MatcherDictionary, K extends keyof T> = T[K] extends (...args: any) => any ? Parameters<T[K]> : never

export type ADTOfType<Tag extends string, T extends MatcherDictionary> = { [K in keyof T]: (...args: MatcherParams<T, K>) => Collapse<CreateObjectFromProperty<Tag, K> & Unpack<MatcherParams<T, K>>> }

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
      filter: <T extends GetObjectValues<ExtractMatcherParams<Tag, Matchers>>>(anyADT: Collapse<T>, specificADT: keyof typeof _ADTMatcher) => specificADT === anyADT[type] ? anyADT : undefined,
      in: (anyADT: Collapse<GetObjectValues<ExtractMatcherParams<Tag, Matchers>>>, specificADT: keyof typeof _ADTMatcher) => anyADT[type] === specificADT,
      of: { ...ofTypeObj } as ADTOfType<Tag, Matchers>,
      match: <ADTFunctionRecords extends { [K in keyof Matchers]: (...args: Parameters<Matchers[K]>) => unknown }>(_ADTFunc: Collapse<ADTFunctionRecords>) => {
        return <ADTMappedValues extends GetObjectValues<ExtractMatcherParams<Tag, Matchers>>>(_ADTValue: Collapse<ADTMappedValues>) => _ADTFunc[_ADTValue[type]](_ADTValue) as ReturnType<ADTFunctionRecords[ADTMappedValues[Tag]]>
      },
      strictMatch: <ADTFunctionRecords extends { [K in keyof Matchers]: (...args: Parameters<Matchers[K]>) => unknown }>(_ADTFunc: Collapse<ADTFunctionRecords>) => {
        return <ADTMappedValues extends GetObjectValues<ExtractMatcherParams<Tag, Matchers>>>(_ADTValue: Collapse<ADTMappedValues>) => {
          const currentADTType = _ADTValue[type];
          const tryMatch = _ADTMatcher[currentADTType](_ADTValue)
          if(!tryMatch.success) {
            throw tryMatch.error
          }
          return _ADTFunc[currentADTType](_ADTValue) as ReturnType<ADTFunctionRecords[ADTMappedValues[Tag]]>
        }
      }
    }
  }
  return generator
}
