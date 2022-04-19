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

/**
 * @description 20、实现一个 RemoveIndexSignature 工具类型，用于移除已有类型中的索引签名
 */

interface Fooii {
  [key: string]: any
  [key: number]: any
  bar: () => void
}

type GetKey<V1, V2> = V1 extends V2 ? never : V2
type RemoveIndexSignature<T> = {
  [K in keyof T as GetKey<string, K> &
    GetKey<number, K> &
    GetKey<symbol, K>]: T[K]
}

type FooWithOnlyBar = RemoveIndexSignature<Fooii> //{ bar: () => void; }
// 思路：这里利用的是 [k in as ]的用法。as过的语法可以直接实现对k的判断过滤

/**
 * @description 21、实现一个 Mutable 工具类型，用于移除对象类型上所有属性或部分属性的 readonly 修饰符。
 */

type Foooo = {
  readonly a: number
  readonly b: string
  readonly c: boolean
}

type Mutable<T, Keys extends keyof T = keyof T> = Omit<T, Keys> & {
  -readonly [K in Keys]: T[K]
}

const mutableFoo: Mutable<Foooo, 'a'> = { a: 1, b: '2', c: true }

mutableFoo.a = 3 // OK
// mutableFoo.b = '6'; // Cannot assign to 'b' because it is a read-only property.
// 知识点 -readonly 可以去除属性上的 readonly属性，语法和 -? 去掉可选属性一直。
// 之后利用 Omit先构造一个不包含指定属性的类型，之后再基于Keys从已有的T上提取类型
// 通过 - readonly 去除只读限制，之后通过交叉 & 来合并二者。

/**
 * @description 22、实现一个 IsUnion 工具类型，判断指定的类型是否为联合类型
 */

type IsUnion<T, U = T> = T extends any
  ? [U] extends [T]
    ? false
    : true
  : never

type I000 = IsUnion<string | number> // true
type I111 = IsUnion<string | never> // false
type I222 = IsUnion<string | unknown> // false

/**
 * 知识点:
 * 联合类型作为泛型的时候 extends 会触发分发执行
 * 联合类型T 写成 [T] 就变成了普通类型，extends的时候不会分发执行
 * 这里第一步的 T extends any 肯定为真，这个其实就是利用其分发的特性，
 * 后面的 [T] 就是一个联合类型拆开后的某一个，因此如果是联合类型的话 [U] extends [T] 一定为否
 */

/**
 * @description 23、实现一个 IsNever 工具类型，判断指定的类型是否为 never 类型
 */
type I01 = IsNever<never> // true
type I11 = IsNever<never | string> // false
type I21 = IsNever<null> // false

type IsNever<T> = [T] extends [never] ? true : false

// 知识点 : never 是一个联合类型，因此要通过 [T] 将其变成普通类型，再去 extends

/**
 * @description 24、实现一个 Reverse 工具类型，用于对元组类型中元素的位置颠倒，并返回该数组。元组的第一个元素会变成最后一个，最后一个元素变成第一个。
 */

type Reverse<T extends any[], R extends any[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? [...Reverse<Rest>, First]
  : R

//  type Reverse<T extends Array<any>> = T extends [infer First, ...infer Rest]
// ? [...Reverse<Rest>, First]
// : [];

type R0 = Reverse<[]> // []
type R1 = Reverse<[1, 2, 3]> // [3, 2, 1]
// 递归就好

/**
 * @description 25、实现一个 Split 工具类型，根据给定的分隔符（Delimiter）对包含分隔符的字符串进行切割。可用于定义 String.prototype.split 方法的返回值类型。
 */

type Item = 'semlinker,lolo,kakuqo'

type Split<
  S extends string,
  Delimiter extends string
> = S extends `${infer First}${Delimiter}${infer Rest}`
  ? [First, ...Split<Rest, Delimiter>]
  : [S]

type ElementType = Split<Item, ','> // ["semlinker", "lolo", "kakuqo"]
// 知识点: ts 映射类型里可以使用js里的模板变量的语法，用法和含义都相同
// 思路: 熟练掌握 extends 配合 infer的用法

/**
 * @description 26、实现一个 ToPath 工具类型，用于把属性访问（. 或 []）路径转换为元组的形式。
 */

type ToPath<S extends string> = S extends `${infer A}.${infer B}`
  ? [...ToPath<A>, ...ToPath<B>]
  : S extends `${infer A}[${infer B}]`
  ? [A, B]
  : [S]

type aaa = ToPath<'foo.bar.baz'> //=> ['foo', 'bar', 'baz']
type bbb = ToPath<'foo[0].bar.baz'> //=> ['foo', '0', 'bar', 'baz']

/**
 * @description 27、完善 Chainable 类型的定义，使得 TS 能成功推断出 result 变量的类型。调用 option 方法之后会不断扩展当前对象的类型，使得调用 get 方法后能获取正确的类型
 */

declare const config: Chainable

type ITypes = string | number | symbol

type Chainable<T = {}> = {
  option: <K extends ITypes, V>(
    key: K,
    value: V
  ) => Chainable<T & { [P in K]: V }>
  get: () => MapKey<T>
}

const result = config
  .option('age', 7)
  .option('name', 'lolo')
  .option('address', { value: 'XiaMen' })
  .get()

type ResultType = typeof result
// 期望 ResultType 的类型是：
// {
//   age: number
//   name: string
//   address: {
//     value: string
//   }
// }

/**
 * @description 28、实现一个 Repeat 工具类型，用于根据类型变量 C 的值，重复 T 类型并以元组的形式返回新的类型
 */

type Repeat<T, C extends number, R extends any[] = []> = R['length'] extends C
  ? R
  : Repeat<T, C, [...R, T]>

type R01 = Repeat<0, 0> // []
type R12 = Repeat<1, 1> // [1]
type R22 = Repeat<number, 2> // [number, number]

/**
 * @description 29、实现一个 RepeatString 工具类型，用于根据类型变量 C 的值，重复 T 类型并以字符串的形式返回新的类型。
 */
type RepeatString<
  T extends string,
  C extends number,
  S extends any[] = [], //  用于判断是否递归完毕
  R extends string = '' //  用于累加记录已遍历过的字符串
> = S['length'] extends C ? R : RepeatString<T, C, [...S, 1], `${R}${T}`>

type S01 = RepeatString<'a', 0> // ''
type S11 = RepeatString<'a', 2> // 'aa'
type S21 = RepeatString<'ab', 3> // 'ababab'

/**
 * @description 30、实现一个 ToNumber 工具类型，用于实现把数值字符串类型转换为数值类型。
 */
type ToNumber<
  T extends string,
  R extends any[] = []
> = `${R['length']}` extends T ? R['length'] : ToNumber<T, [...R, 1]>

type T03 = ToNumber<'0'> // 0
type T13 = ToNumber<'10'> // 10
type T23 = ToNumber<'20'> // 20
// 思路: ts里运算很匮乏，并没有直接的数字运算，
// 这里巧妙的利用了数组长度来实现，通过递归构造数组，
// 使得构造出来的数组长度和期望的匹配，
// 主要要把数组长度通过字符串模板的方式转换成字符串。否则永远匹配不成功

/**
 * @description 31、实现一个 SmallerThan 工具类型，用于比较数值类型的大小。
 */
type SmallerThan<
  N extends number,
  M extends number,
  A extends any[] = []
> = A['length'] extends M ? false : A['length'] extends N ? true : false

type S04 = SmallerThan<0, 1> // true
type S14 = SmallerThan<2, 0> // false
type S24 = SmallerThan<8, 10> // true
// 思路: 依然是利用构造数组的长度来判断，体用递归逐步迭代，先和哪个数匹配上，哪个数就小，注意边界问题。
// 这里要求的是第一个数小，如果相等，返回自然是false

/**
 * @description 32、实现一个 Add 工具类型，用于实现对数值类型对应的数值进行加法运算。
 */
type Add<
  A extends number,
  B extends number,
  C extends any[] = [],
  D extends any[] = []
> = C['length'] extends A
  ? D['length'] extends B
    ? [...C, ...D]['length']
    : Add<A, B, C, [...D, '']>
  : Add<A, B, [...C, ''], D>

type A0 = Add<5, 5> // 10
type A1 = Add<8, 20> // 28
type A2 = Add<10, 30> // 40
//  思路：数组匹配，当长度等于数值时，停止；然后返回最后的数组长度之和

/**
 * @description 33、实现一个 Filter 工具类型，用于根据类型变量 F 的值进行类型过滤。
 */
type Filter<T extends any[], F, R extends any[] = []> = T extends [
  infer A,
  ...infer B
]
  ? A extends F
    ? Filter<B, F, [A, ...R]>
    : Filter<B, F, [...R]>
  : R

type F05 = Filter<[6, 'lolo', 7, 'semlinker', false], number> // [6, 7]
type F15 = Filter<['kakuqo', 2, ['ts'], 'lolo'], string> // ["kakuqo", "lolo"]
type F25 = Filter<[0, true, any, 'abao'], string> // [any, "abao"]

/**
 * @description 34、实现一个 Flat 工具类型，支持把数组类型拍平（扁平化）。
 */
type Flat<T extends any[]> = T extends [infer A, ...infer B]
  ? A extends any[]
    ? [...Flat<A>, ...Flat<B>]
    : [A, ...Flat<B>]
  : []

type F06 = Flat<[]> // []
type F16 = Flat<['a', 'b', 'c']> // ["a", "b", "c"]
type F26 = Flat<['a', ['b', 'c'], ['d', ['e', ['f']]]]> // ["a", "b", "c", "d", "e", "f"]

/**
 * @description 35、实现 StartsWith 工具类型，判断字符串字面量类型 T 是否以给定的字符串字面量类型 U 开头，并根据判断结果返回布尔值。
 */

type StartsWith<T extends string, U extends string> = T extends `${U}${infer A}`
  ? true
  : false

type S08 = StartsWith<'123', '12'> // true
type S18 = StartsWith<'123', '13'> // false
type S82 = StartsWith<'123', '1234'> // false

/**
 * @description 36、实现 IsAny 工具类型，用于判断类型 T 是否为 any 类型
 */
type IsAny<T> = 0 extends 1 & T ? true : false
// 思路: 利用任何类型和any交叉都等于any来实现。

type I022 = IsAny<never> // false
type I122 = IsAny<unknown> // false
type I221 = IsAny<any> // true

/**
 * @description 36、实现 AnyOf 工具类型，只要数组中任意元素的类型非 Falsy 类型、 {} 类型或 [] 类型，则返回 true，否则返回 false。如果数组为空的话，则返回 false
 * falsy 值 (虚值) 是在 Boolean 上下文中认定为 false 的值
 */

type NotEmptyObject<T> = T extends {} ? ({} extends T ? false : true) : true
type Flasy = 0 | '' | false | []
type AnyOf<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends Flasy
    ? AnyOf<Rest>
    : NotEmptyObject<First>
  : false
type A01 = AnyOf<[]> // false
type A11 = AnyOf<[0, '', false, [], {}]> // false
type A21 = AnyOf<[1, '', false, [], {}]> // true

/**
 * @description 37、实现 Replace 工具类型，用于实现字符串类型的替换操作
 */
type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer A}${From}${infer B}` ? `${A}${To}${B}` : S

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer A}${From}${infer B}`
  ? ReplaceAll<`${A}${To}${B}`, From, To>
  : S

type R012 = Replace<'', '', ''> // ''
type R121 = Replace<'foobar', 'bar', 'foo'> // "foofoo"
type R221 = Replace<'foobarbar', 'bar', 'foo'> // "foofoobar"

/**
 * @description 38、实现 IndexOf 工具类型，用于获取数组类型中指定项的索引值。若不存在的话，则返回 -1 字面量类型
 */
type IndexOf<A extends any[], Item, R extends any[] = []> = A extends [
  infer A,
  ...infer B
]
  ? [A] extends [Item] // 去掉联合类型的影响
    ? R['length']
    : IndexOf<B, Item, [A, ...R]>
  : -1

type Arr = [1, 2, 3, 4, 5]
type I04 = IndexOf<Arr, 0> // -1
type I14 = IndexOf<Arr, 1> // 0
type I24 = IndexOf<Arr, 3> // 2

// TODO:不会
/**
 * @description 39、实现一个 Permutation 工具类型，当输入一个联合类型时，返回一个包含该联合类型的全排列类型数组。
 */
type Om<T, I> = T extends I ? never : T
type Test<T extends any[], F, G = F> = T extends any[]
  ? F | 1 extends 1
    ? T
    : F extends any
    ? Test<[...T, F], Om<G, F>>
    : T
  : T
type Permutation<T> = Test<[], T>

type P0 = Permutation<'a' | 'b'> // ['a', 'b'] | ['b' | 'a']

type P1 = Permutation<'a' | 'b' | 'c'>

/**
 * @description 40、实现 Unpacked 工具类型，用于对类型执行 “拆箱” 操作。
 */
type Types = string | number | symbol
type Unpacked<T> = T extends Types
  ? T
  : T extends (...arg: any) => infer R
  ? R
  : T extends (infer A)[]
  ? A
  : T extends Promise<infer P>
  ? P
  : never

type T00 = Unpacked<string> // string
type T01 = Unpacked<string[]> // string
type T02 = Unpacked<() => string> // string
type T032 = Unpacked<Promise<string>> // string
type T04 = Unpacked<Unpacked<Promise<string>[]>> // string
type T05 = Unpacked<any> // any
type T06 = Unpacked<never> // never
