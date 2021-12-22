# Map

## 映射 Map

### 为什么 ES6 要提供 Map 数据结构？

如果使用 DOM 节点作为对象 key，这个 key 会被默认转化成字符串 [Object HTMLDivElement]，而不是预想的 DOM 结构对象，这是因为 **Object 只能够使用字符串作为键**，而这给它的使用带来了很大限制。

```js
const data = {}
const element = document.getElementById('myDiv')
data[element] = 'metadata'
console.log(data); // {[object HTMLHeadingElement]: 'metadata'}
```

而 `Map` 可以使用 **任何 js 数据类型作为键**，得到的键是我们期望的 div#myDiv。

```js
const map = new Map()
const element = document.getElementById('myDiv')
map.set(element, 'metadata')
console.log(map); // Map(1) {div#myDiv => 'metadata'}
```
也就是说，`Object` 结构提供了“字符串-值”的对应， `Map` 结构提供了“值-值”对应，这是一种更完善的结构实现。这也是 ES6 想要解决的问题。

### Map 的使用
- 使用 `new` 关键字和 `Map 构造函数` 可以创建一个空的映射，或者接受一个数组作为参数，成员是用来表示键值对的数组
- 使用 set() 方法添加键值对
- 使用 get() 获取
- 使用 has() 查询
- 使用 size 查询（不需要括号）
- 使用 delete() 删除某个键值对
- 使用 clear() 清除所有键值对
```js
const m = new Map()
const m1 = new Map([
    ['name1', 'Matt'],
    ['name2', 'karen'],
])

m.set('name1', 'lily')
m.get('name1') // lily, 同一个键多次赋值，后面的值覆盖前面
m.get('name4') // undefined, 未知键返回 undefined
m.has('name1') // true
m.delete('name1') // true
m.clear() // true
m.size // 0
```

- 使用 keys() 获取所有键名
- 使用 values() 获取所有值
- 使用 entries() 获取所有成员
- 使用 forEach() 遍历所有成员（还可以接受第二个参数，用于绑定 this）
`Map` 的遍历顺序就是插入顺序。
```js
const m = new Map([
  ['key2', 'value2'],
  ['key1', 'value1'],
  ['key3', 'value3'],
])

m.entries() // [['key2', 'value2'], ['key1', 'value1'], ['key3', 'value3'],]
m.keys() // ['key2', 'key1', 'key3']
m.values() // ['value2', 'value1', 'value3']
m.forEach((value, key) => {})
```

```
const obj = {
    key2: 'value2',
    key1: 'value1',
    key2: 'value2',
}
obj.entries()
obj.keys()
obj.values()
```
### 需要注意的点

> 只有对同一个对象的引用， Map 结构才认为是同一个键。

```js
const map = new Map()
map.set(['a'], 555)
map.get(['a']) // undefined
```
set 和 get 表面上针对同一个键，但实际上是两个值，因为`内存地址`不同。这就解决了同名属性碰撞（clash）的问题，扩展别人的库时，如果使用`对象`做键名，就不用担心自己的属性和原作者属性同名。如果使用`基本类型`做键名，只要严格相等就视为一个键。

### Map 与数组、对象的相互转换
- **Map 转数组**：

直接使用扩展运算符···，[...map]

- **数组转 Map**：

直接把数组传入 Map 构造函数，new Map(arr)，arr 的每一项时键值对组成的数组，如[[key, value], [key, value], ...]

- **Map 转对象**：

如果 Map 的所有键都是字符串，那么可以转为对象。遍历 Map 后逐项添加到对象中。

- **对象转 Map**：

遍历对象后逐项添加到 Map 中。

### 选择 Object 还是 Map ？
对于多数开发来说，选择 `Object` 还是 `Map` 只是个人偏好问题。对于在乎内存和性能的开发者来说，对象和映射有显著差别：
- 内存占用：固定大小内存，Map 可以比 Object 多储存 50% 的键值对
- 插入性能：Map 性能更佳
- 查找速度：大量查找， Object 可能更好（再把 Object 当成数组使用的情况下，比如连续数字作为属性，浏览器引擎可以进行优化，在内存中使用更高效的布局）
- 删除性能：大量删除， Map 更好

## 弱映射 WeakMap

`WeakMap` 是增强的键值对存储机制，它与 `Map` 有两个主要区别：
1. WeakMap 的`键`只能是`对象`，不能是其他类型（会报TypeError，但可以使用 new 包装成对象）。值没有限制。
2. Weak 指的是键名所指的对象不计入`垃圾回收程序`，一旦键名所指的对象的其他引用被清除，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用（置为 null）。

### WeakMap 典型应用场景

1. 在 `DOM 元素`上添加数据时就可以使用 WeakMap。
比如记录元素状态，点击次数等，当 DOM 元素被清除时，对应的 WeakMap 记录就会自动移除。

2. 注册`监听事件`
```js
const listener = new WeakMap()
listener.set(element1, handler1)

element1.addEventListener('click', listener.get(element1), false)
```
上述代码中，监听函数放在 WeakMap 里，一旦 DOM 对象消失，与他绑定的监听函数也会消失。

3. 部署`私有属性`

```js
const _counter = new WeakMap()
const _action = new WeakMap()

class Countdown {
 constructer(counter, action) {
     _counter.set(this, counter);
     _action.set(this, action)
 }
 
 dec() {
     let countet = _counter.get(this)
     if(counter < 1) return
     counter--;
     _counter.set(this, counter)
     if(counter === 0) {
         _action.get(this)()
     }
 }
} 

const c = new Countdown(2, () => console.log('DONE'))
c.dec()
c.dec()
// DONE
```
上面代码中，Countdown 类的两个内部属性—— _counter 和 _action 是实例的弱引用，如果`删除实例` c， 它们也会`随之消失`，不会造成内存泄漏。

### WeakMap API

它与 Map 有两个主要区别：
1. 由于键名的存在无法预测，因此`没有遍历操作`keys()、 values()、 entries()、 和 size 属性。
2. 不支持 clear() 方法。

因此只有4个方法可用： `get()`、 `set()`、 `has()`、 `delete()`

```js
const element1 = document.getElementById('el1')
const element2 = document.getElementById('el2')
const m = new WeakMap()
const m1 = new WeakMap([
    [element1, 'Matt'],
    [element2, 'karen'],
])

m.set(element1, 'lily')
m.get(element1) // lily, 同一个键多次赋值，后面的值覆盖前面
m.get(element3) // undefined, 未知键返回 undefined
m.has(element1) // true
m.delete(element1) // true
m.clear // undefined
m.size // undefined
```