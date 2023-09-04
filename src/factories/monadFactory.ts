import { Collapse } from "../any"

export type Monad<Tag extends string, SubTag extends string, T> = Collapse<{
  [K in Tag]: SubTag
} & {
  value: T,
  unit: (value: T) => Monad<Tag, SubTag, T>,
  bind: (fn: (value: T) => T) => Monad<Tag, SubTag, T>
}>

export function monadFactory<Tag extends string>(type: Tag) {
  const generator = <SubTag extends string>(name: SubTag) => ({
    unit: <T>(value: T) => {
      const result = {
        [type]: name,
        value,
        unit: monadFactory<Tag>(type)<SubTag>(name).unit<T>,
        bind: (fn: (value: T) => T) => monadFactory<Tag>(type)<SubTag>(name).unit(fn(value))
      }
      return result as Monad<Tag, SubTag, T>
    }
  })
  return generator
}

// const monadTypeFactory = monadFactory("type")
// const pocketMoneyMonad = monadTypeFactory("pocketMoney")
// const funds = pocketMoneyMonad.unit(25) // value: 25
// const fundsNeeded = funds.bind((value) => value * 10) // value: 250
// const newPocket = funds.unit(5) // value: 5