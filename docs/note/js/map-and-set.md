# Map 和 Set

### 映射 Map

Map 可以使用任何 js 数据类型作为键。Map 实例会维护键值对的插入顺序。

- 使用 new 关键字和 Map 构造函数可以创建一个空的映射

```js
const m = new Map()
```

- 使用 set() 方法添加键值对
- 使用 get() 获取
- 使用 has() 查询
- 使用 size 查询（不需要括号）
- 使用 delete() 删除某个键值对
- 使用 clear() 清除所有键值对
```js
m.set('firstName', 'Matt')
m.get('firstName') // Matt
m.has('firstName') // true
m.delete('firstName') // true
m.clear() // true
m.size // 1
```

创建一个映射：
- 使用 entries() 遍历
- 使用 forEach() 遍历
- 使用 keys() 获取所有键名
- 使用 values() 获取所有值
```js
const m = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
  ['key3', 'value3'],
])
```

```js
m.enteries() // [['key1', 'value1'], ['key2', 'value2'], ['key3', 'value3'],]
m.keys() // ['key1', 'key2', 'key3']
m.values() // ['value1', 'value2', 'value3']
m.forEach((value, key) => {})
```

#### 选择 Object 还是 Map ？
对于多数开发来说，选择 Object 还是 Map 只是个人偏好问题。对于在乎内存和性能的开发者来说，对象和映射有显著差别：
- 内存占用：固定大小内存，Map 可以比 Object 多储存 50% 的键值对
- 插入性能：Map 性能更佳
- 查找速度：大量查找， Object 可能更好（再把 Object 当成数组使用的情况下，比如连续数字作为属性，浏览器引擎可以进行优化，在内存中使用更高效的布局）
- 删除性能：大量删除， Map 更好

### 集合 Set

Set 中的元素是唯一的。Set 可以包含任何数据类型作为值。Set 会维护插入时顺序。

- 使用 new 关键字和 Set 构造函数可以创建一个空的集合

```js
const s = new Set()
```
- 使用 add() 增加值
- 使用 has() 查询
- 通过 size 取得元素数量
- 使用 delete() 删除元素
- 使用 clear() 清除元素
```js
s.add('Matt')
s.has('Matt') // true
s.delete('Matt') // true
s.clear()
s.size // 0
```

- values() 和别名方法 keys() 获取所有值
- enteries() 返回一个迭代器，包含两个元素的数组，两个元素相同
- forEach() 依次迭代每个键值对，键与值相同
```js
const s = new Set(['value1', 'value2', 'value3'])
s.values() // ['value1', 'value2', 'value3']
s.keys() // ['value1', 'value2', 'value3']
s.enteries() // [['value1', 'value1'],['value2', 'value2'],['value3', 'value3']]
s.forEach((value, dupValue) => {}) // value === dupValue
```

- Array 与 Set 转换
```js
const set = new Set(array)
const array = [...set]
```
- 数组去重
```js
Array.from(new Set(arr))
```
- 数组求交集并集补集
```js
const union = new Set([...a, ...b]) // 并集
const intersection = new Set(a.filter(i => b.includes(i))) // 交集
const difference = new Set(a.filter(i => !b.includes[i])) // 补集
```
- set 求交集并集补集
```js
const union = new Set([...a, ...b]) // 并集
const intersection = new Set([...a].filter(i => b.has(i))) // 交集
const difference = new Set([...a].filter(i => !b.has[i])) // 补集
```
