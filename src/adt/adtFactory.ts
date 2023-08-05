import { z } from "zod";
import type { CreateObjectFromProperty } from "../objects";
import type { Unpack } from "../arrays";
import type { ValuesOfKeys } from "../indexed";
import type { Collapse } from "../any";

type ExtractMatcherParams<
  Tag extends string,
  T extends Record<string, (match: z.infer<any>) => z.SafeParseReturnType<any, any>>
> = {
  [K in keyof T]: CreateObjectFromProperty<Tag, K> & Unpack<Parameters<T[K]>>
}

export type adtFactory<Tag extends string> = typeof adtFactory<Tag>
export function adtFactory<Tag extends string>(type: Tag) {
  return <Matchers extends Record<string, (match: z.infer<any>) => z.SafeParseReturnType<any, any>>>(_ADTMatcher: Collapse<Matchers>) => {
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
      of: { ...ofTypeObj } as { [K in keyof Matchers]: (...args: Parameters<Matchers[K]>) => Collapse<CreateObjectFromProperty<Tag, K> & Unpack<Parameters<Matchers[K]>>> },
      match: <ADTFunctionRecords extends { [K in keyof Matchers]: (...args: Parameters<Matchers[K]>) => unknown }>(_ADTFunc: Collapse<ADTFunctionRecords>) => {
        return <ADTMappedValues extends ValuesOfKeys<ExtractMatcherParams<Tag, Matchers>>>(_ADTValue: Collapse<ADTMappedValues>, ignoreError: boolean = false) => {
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