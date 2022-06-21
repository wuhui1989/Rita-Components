import { ReactNode } from 'react'

export type BasedProps = {
  className?: string,
  children?: ReactNode
}
// 在没有枚举开销的情况下获取字符串文字类型的数组值的方法
export const tupleStr = <T extends string[]>(...args: T) => args
export const tupleNum = <T extends number[]>(...args: T) => args

export const isArray = Array.isArray
export const isNumber = (val: unknown): val is number => typeof val === 'number'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'


