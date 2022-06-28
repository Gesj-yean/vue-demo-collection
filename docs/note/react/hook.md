# React Hook 学习

## useState

```js
const [state, setState] = useState(initialState);
```
- 返回一个 state, 以及更新 state 的函数。必须要传入 state 的初始值 initialState 值。
- initialState 可以是一个值，也可以是一个函数，但必须有返回值（此函数只会在渲染时执行一遍）。
- 可以在 setState 中直接传入新的值，也可以传入一个方法，入参是当前 state 值，返回新 state 值。

## useEffect

```js
useEffect(didUpdate);
```
- 赋值给 useEffect 的函数会在组件渲染到屏幕之后立即执行。
- 赋值给 useEffect 的函数可以在某些值改变后执行，需要传入第二个参数
- didUpdate 中支持返回一个函数（清除函数），会在组件卸载时执行。
- 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。

## useContext

和 Vue 中的状态管理相似。
```js
const value = useContext(MyContext);
```
- 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。
- 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

## useReducer

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
- reducer 形如：(state, action) => newState，调用 dispatch 可以传入 action 的值，然后在 action 中操作，返回新的 newState 值。
- 你可以选择惰性地创建初始 state。为此，需要传入 useReducer 的第三个参数 init 函数，这样初始 state 将被设置为 init(initialArg)。
- init 函数的作用和 useState 第二个参数传入函数的作用相同，此函数只会在渲染时执行一遍。

## useCallback

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
- useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
- fn 中引用到的值都应该出现在依赖项中。

## useMemo

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
- 会在某个依赖项改变时才计算才重新计算 memoized 值，useMemo 常用于开销大的计算场景。
- 返回一个 memoized 值，含义是具有记忆的储存。
- 如果没有依赖项，useMemo 在每次渲染时都会计算新的值。

## useRef

和 Vue 中的 $ref 作用相同。用于访问 DOM 节点。
```js
const refContainer = useRef(initialValue);
```
- useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数 initialValue。
- 返回的 ref 对象在组件的整个生命周期内保持不变。