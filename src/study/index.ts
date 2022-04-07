/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @description 1、把后置选项变成可选或者必填；下面是解答
 */
type Foo = {
  a: number
  b?: string
  c: boolean
}

/** 交叉类型进行扁平化处理 */
type MapKey<T> = {
  [p in keyof T]: T[p]
}

type SetOptional<T, K extends keyof T> = MapKey<
  Partial<Pick<T, K>> & Omit<T, K>
>

// 测试用例
type SomeOptional = SetOptional<Foo, 'a' | 'b'>

// type SomeOptional = {
// 	a?: number; // 该属性已变成可选的
// 	b?: string; // 保持不变
// 	c: boolean;
// }

type SetRequired<T, K extends keyof T> = MapKey<
  Omit<T, K> & Required<Pick<T, K>>
>
// 测试用例
type SomeRequired = SetRequired<Foo, 'b' | 'c'>
// type SomeRequired = {
// 	a?: number;
// 	b: string; // 保持不变
// 	c: boolean; // 该属性已变成必填
// }

/**
 * @description 2、如何定义一个 ConditionalPick 工具类型，支持根据指定的 Condition 条件来生成新的类型
 */
interface Example {
  a: string
  b: string | number
  c: () => void
  d: {}
}

type ConditionalPick<T, K> = {
  [P in keyof T as T[P] extends K ? P : never]: T[P]
}
// 测试用例：
type StringKeysOnly = ConditionalPick<Example, string>
//=> {a: string}

/**
 * @description 3、定义一个工具类型 AppendArgument，为已有的函数类型增加指定类型的参数，新增的参数名是 x，将作为新函数类型的第一个参数
 */

type Fn = (a: number, b: string) => number
type AppendArgument<F extends (...args: any[]) => any, A> = (
  x: A,
  ...args: Parameters<F>
) => ReturnType<F>

type FinalFn = AppendArgument<Fn, boolean>
// (x: boolean, a: number, b: string) => number

/**
 * @description 4、定义一个 NativeFlat 工具类型，支持把数组类型拍平（扁平化)
 */

type DeepFlat<T extends any[]> = {
  [P in keyof T]: T[P] extends any[] ? DeepFlat<T[P]> : T[P]
}[number]

// 测试用例：
type NaiveResult = DeepFlat<[['a'], ['b', 'c'], ['d', ['e']]]>
// NaiveResult的结果： "a" | "b" | "c" | "d"

/**
 * @description 5、使用类型别名定义一个 EmptyObject 类型，使得该类型只允许空对象赋值：
 */

type EmptyObject = {
  [K in PropertyKey]: never
}

// 测试用例
const shouldPass: EmptyObject = {} // 可以正常赋值
// const shouldFail: EmptyObject = {
//   // 将出现编译错误
//   prop: 'TS'
// }

/**
 * @description 6、在通过 EmptyObject 类型的测试用例检测后，我们来更改以下 takeSomeTypeOnly 函数的类型定义，让它的参数只允许严格SomeType类型的值
 */

type SomeType = {
  prop: string
}

type Exclusive<T1, T2 extends T1> = {
  [K in keyof T2]: K extends keyof T1 ? T2[K] : never
}

/**
 * @param x
 * @description 更改以下函数的类型定义，让它的参数只允许严格SomeType类型的值
 */
function takeSomeTypeOnly<T extends SomeType>(x: Exclusive<SomeType, T>) {
  return x
}
// 从返回的地方下手，作类型检验

// 测试用例：
const x = { prop: 'a' }
takeSomeTypeOnly(x) // 可以正常调用

const y = { prop: 'a', addditionalProp: 'x' }
// takeSomeTypeOnly(y) // 将出现编译错误

/**
 * @description 7、定义 NonEmptyArray 工具类型，用于确保数据非空数组
 */
type NonEmptyArray<T> = [T, ...T[]]

// const a: NonEmptyArray<string> = [] // 将出现编译错误
const b: NonEmptyArray<string> = ['Hello TS'] // 非空数据，正常使用

/**
 * @description 8、定义一个 JoinStrArray 工具类型，用于根据指定的 Separator 分隔符，对字符串数组类型进行拼接
 */
type JoinStrArray<
  Arr extends string[],
  Separator extends string,
  Result extends string = ''
> = Arr extends [infer El, ...infer Rest]
  ? Rest extends string[]
    ? El extends string
      ? Result extends ''
        ? JoinStrArray<Rest, Separator, `${El}`>
        : JoinStrArray<Rest, Separator, `${Result}${Separator}${El}`>
      : `${Result}`
    : `${Result}`
  : `${Result}`
// 类型映射的代码里可以用 js 里模板变量的用法。之后就是extends 配合 infer 从数组中提取类型出来。
// 测试用例
type Names = ['Sem', 'Lolo', 'Kaquko']
type NamesComma = JoinStrArray<Names, ','> // "Sem,Lolo,Kaquko"
type NamesSpace = JoinStrArray<Names, ' '> // "Sem Lolo Kaquko"
type NamesStars = JoinStrArray<Names, '⭐️'> // "Sem⭐️Lolo⭐️Kaquko"

/**
 * @description 9、实现一个 Trim 工具类型，用于对字符串字面量类型进行去空格处理
 */
type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V
type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V

type Trim<V extends string> = TrimLeft<TrimRight<V>>

// 测试用例
type Result = Trim<' semlinker '>
//=> 'semlinker'

/**
 * @description 10、实现一个 IsEqual 工具类型，用于比较两个类型是否相等
 */
type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false

// 测试用例
type E0 = IsEqual<1, 2> // false
type E1 = IsEqual<{ a: 1 }, { a: 1 }> // true
type E2 = IsEqual<[1], []> // false

/**
 * @description 10、实现一个 Head 工具类型，用于获取数组类型的第一个类型
 */
type Head<T extends any[]> = T extends [] ? never : T[0]

// 测试用例
type H0 = Head<[]> // never
type H1 = Head<[1]> // 1
type H2 = Head<[3, 2]> // 3

/**
 * @description 11、实现一个 Tail 工具类型，用于获取数组类型除了第一个类型外，剩余的类型
 */
type Tail<T extends any[]> = T extends [any, ...infer Rest]
  ? Rest extends [any, ...any[]]
    ? Rest
    : []
  : []

// 测试用例
type T0 = Tail<[]> // []
type T1 = Tail<[1, 2]> // [2]
type T3 = Tail<[1]> // []
type T2 = Tail<[1, 2, 3, 4, 5]> // [2, 3, 4, 5]

/**
 * @description 12、实现一个 Unshift 工具类型，用于把指定类型 E 作为第一个元素添加到 T 数组类型中
 */

type Unshift<T extends any[], E> = T extends [...infer Arr] ? [E, ...Arr] : [E]

// 测试用例
type Arr0 = Unshift<[], 1> // [1]
type Arr1 = Unshift<[1, 2, 3], 0> // [0, 1, 2, 3]

/**
 * @description 12、实现一个 Shift 工具类型，用于移除 T 数组类型中的第一个类型
 */
type Shift<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends undefined
    ? []
    : Rest extends any[]
    ? [...Rest]
    : []
  : []

// 测试用例
type S0 = Shift<[1, 2, 3]> // [2, 3]
type S1 = Shift<['string', 'number', 'boolean']> // [number,boolean]
type S2 = Shift<[]> // []

/**
 * @description 13、实现一个 Push 工具类型，用于把指定类型 E 作为最后一个元素添加到 T 数组类型中
 */

type Push<T extends any[], V> = T extends [...infer Rest] ? [...Rest, V] : [V]

// 测试用例
type Arr3 = Push<[], 1> // [1]
type Arr4 = Push<[1, 2, 3], 4> // [1, 2, 3, 4]

/**
 * @description 14、实现一个 Includes 工具类型，用于判断指定的类型 E 是否包含在 T 数组类型中
 */

type Includes<T extends any[], E> = T extends [infer First, ...infer Rest]
  ? IsEqual<First, E> extends true
    ? true
    : Includes<Rest, E>
  : false

type I0 = Includes<[], 1> // false
type I1 = Includes<[2, 2, 3, 1], 2> // true
type I2 = Includes<[2, 3, 3, 1], 1> // true

// TODO:不会
/**
 * @description 15、实现一个 UnionToIntersection 工具类型，用于把联合类型转换为交叉类型
 */
type UnionToIntersection<U> = (U extends U ? (arg: U) => any : never) extends (
  arg: infer T
) => any
  ? T
  : never
// 利用联合类型在 extends 的时自动分发，在利用函数参数类型逆变，从而实现了联合类型到交叉类型的转变。
// 测试用例
type U0 = UnionToIntersection<string | number> // never
type U1 = UnionToIntersection<{ name: string } | { age: number }> // { name: string; } & { age: number; }

/**
 * @description 16、实现一个 OptionalKeys 工具类型，用来获取对象类型中声明的可选属性
 */

type Person = {
  id: string
  name: string
  age: number
  from?: string
  speak?: string
}

type OptionalKeys<T> = Exclude<
  {
    [P in keyof T]: undefined extends T[P] ? P : never
  }[keyof T],
  undefined
>
type PersonOptionalKeys = OptionalKeys<Person> // "from" | "speak"

/**
 * @description 17、实现一个 Curry 工具类型，用来实现函数类型的柯里化处理
 */
type Curry<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = P extends [infer A, ...infer B]
  ? B['length'] extends 0
    ? F
    : (arg: A) => Curry<(...args: B) => R>
  : F

type F0 = Curry<() => Date> // () => Date
type F1 = Curry<(a: number) => Date> // (arg: number) => Date
type F2 = Curry<(a: number, b: string) => Date> //  (arg_0: number) => (b: string) => Date
// 利用 extends 来探测参数的长度，利用递归逐渐减少参数个数。算法思想是是减治

/**
 * @description 18、实现一个 Merge 工具类型，用于把两个类型合并成一个新的类型。第二种类型（SecondType）的 Keys 将会覆盖第一种类型（FirstType）的 Keys
 */

type Fob = {
  a: number
  b: string
}

type Bar = {
  b: number
}

type Merge<FirstType, SecondType> = Omit<FirstType, keyof SecondType> &
  SecondType

const ab: Merge<Fob, Bar> = { a: 1, b: 2 }

/**
 * @description 19、实现一个 RequireAtLeastOne 工具类型，它将创建至少含有一个给定 Keys 的类型，其余的 Keys 保持原样
 */

type Responder = {
  text?: () => string
  json?: () => string
  secure?: boolean
}

type RequireAtLeastOne<
  ObjectType,
  KeysType extends keyof ObjectType = keyof ObjectType
> = KeysType extends keyof ObjectType
  ? ObjectType & Required<Pick<ObjectType, KeysType>>
  : never

// 表示当前类型至少包含 'text' 或 'json' 键
const responder: RequireAtLeastOne<Responder, 'text' | 'json'> = {
  json: () => '{"message": "ok"}',
  secure: true
}
// 这里利用了联合类型作为泛型是 extends 会分发处理的特性，之后将去掉某个属性的类型与只有某个属性，且必填的类型做交叉合并
