# Set

## 集合 Set

`Es6` 新增的 `Set` 是一种新的`集合类型`（它的所有成员的值都是唯一的，没有重复），为 `JavaScript` 带来集合数据结构。`Set` 很多方面像加强的 `Map`，因为它们大多数的 `API` 和行为都是共有的。

```js
const s = new Set()
```

初始化之后可以使用 `add()` 增加值，`has()` 查询值，`size` 获取元素数量，`delete()` 和 `clear()` 删除元素。
```js
s.add('Matt').add('Kate') // add 返回实例集合，所以可以将多个操作连缀起来
s.has('Matt') // true
s.size // 2
s.delete('Matt')
s.clear() //  s.size = 0  s.has('Matt') // false
```

和 `Map` 一样，`Set` 可以包含任何 `js` 数据类型作为值。如果对象被用作值，属性被修改时也不会改变集合：
```js
const s = new Set()
const obj = {}
const arr = []

s.add(obj).add(arr)
obj.name = 'Matt'
arr.push('Matt')
s.has(obj) // true
s.has(arr) // true
```
`Set` 函数可以接受一个数组（或者具有 `iterable` 接口的其他数据接口）作为参数初始化。
```js
// 示例1
const s1 = new Set([1,2,3,4,5])

// 示例2
function divs() {
    return [...document.querySelectorAll('div')]
}
const s2 = new Set(divs())
```
由于成员具有唯一性，可以用来对数组进行去重。
```js
// 方法一
Array.from(new Set(array))

// 方法二
[...new Set(array)]
```

### 遍历操作

`Set` 实例有 4 个遍历方法。遍历的顺序就是插入的顺序。

- `keys()` 返回键名的遍历器
- `values()` 返回键值的遍历器
- `entires()` 返回键值对的遍历器
- `forEach()` 回调遍历成员
```js
let set = new Set(['red', 'yellow', 'green', 'blue'])
set.keys() // ['red', 'yellow', 'green', 'blue']
set.values() // ['red', 'yellow', 'green', 'blue']
set.entires() // [['red', 'red'], ['yellow', 'yellow'], ['green', 'green'], ['blue', 'blue']]
set.forEach((value, key) => {})
```
`Set` 结构默认可以遍历，可以省略 `values()` 方法，直接用 `for...of` 遍历 `Set`
```js
for(let x of set){
    console.log(x) //red
}
```

### 应用

- 扩展运算符(...)
```js
let set = new Set(['red', 'yellow', 'green', 'blue'])
let arr = [...set] // ['red', 'yellow', 'green', 'blue']
```
- map 和 filter 方法
```js
let set = new Set([1,2,3])
set = new Set([...set].map(x => x*2)) // {2,4,6}
set = new Set([...set].filter(x => x>2)) // {4,6}
```
- 并集 Union
```js
let a = new Set([1,2,3])
let b = new Set([4,3,2])
let union = new Set([...a, ...b]) // {1,2,3,4}
```
- 交集 Intersect
```js
let a = new Set([1,2,3])
let b = new Set([4,3,2])
let intersect = new Set([...a].filter(x => b.has(x))]) // {2,3}
```
- 差集 Difference
```js
let a = new Set([1,2,3])
let b = new Set([4,3,2])
let difference = new Set([...a].filter(x => !b.has(x))]) // {2,3}
```

## 弱集合 WeakSet

弱集合和集合的区别有三点：
- `WeakSet` 的成员`只能是对象`，不能是基本类型的值
- 垃圾回收机制不考虑 `WeakSet` 对该对象的引用
- WeakSet `不可遍历`

对于第一点，如果使用基本类型，如 set.add(1)，就会报错： `TypeError: Invalid value in weak set`

对于第二点，因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。而 WeakSet 里的引用都是`弱引用`，如果对象的外部引用消失，垃圾回收机制就会自动回收该对象所占用的内存。

对于第三点，当外部引用消失，它在 `WeakSet` 里面的引用就会自动消失，但由于不能确定垃圾回收机制执行的时间，在垃圾回收机制运行前后就可能导致成员个数不一样，因此 `ES6` 规定 `WeakSet 不可遍历`。

```js
const a = [[1,2], [3,4]]
const ws = new WeakSet(a) // WeakSet {[1,2], [3,4]}

const b = [1,2]
const ws = new WeakSet(b) // Uncaught TypeError: Invalid value used in weak set
```
`WeakSet` 结构有以下三个方法：
- add()
- delete()
- has()
```js
const ws = new WeakSet()
const obj = {}
const arr = []

ws.add(obj)
ws.has(obj) // true
ws.delete(obj) // true
ws.has(obj) // false
```
因为 `WeakSet` 中的成员在任何时候都有可能被销毁，所以没有必要提供迭代能力，如 `forEach()` 等遍历操作，也没有 `size` 属性。

### WeakSet 典型应用场景

- `储存 DOM 节点`，而不用担心节点移除时造成的内存泄漏。

```js
const disabledElements = new WeakSet()
const loginButton = document.querySelector('#login')
```
当 login 按钮从 DOM 树中被删除，就可以立即释放内存。
- 部署`私有属性`

```js
const foos = new WeakSet()
class Foo {
    constructor() {
        foods.add(this)
    }
    method () {
        if(!foos.has(this)) {
            throw new TypeError('Foo.prototype.method 只能在 Foo 的实例上调用')
        }
    }
}
```
上面代码保证了 `Foo` 的实例方法只能在 `Foo` 的实例上调用。这里使用 `WeakSet` 的好处是，数组 `foos` 对实例的引用不会被计入内存回收机制，所以删除实例的时候不用考虑 `foos`。也不会出现内存泄漏。
