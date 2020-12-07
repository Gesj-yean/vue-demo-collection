# ECMAScript 2021新特性

ECMAScript每年都会更新一次，ECMAScript 2021 又称 ES12也在今年发布。那么ES12会带来哪些新的特性，在本文中会一一介绍。

## String.prototype.replaceAll

该提案目前已经处于第四阶段，意味着已准备好将其添加到正式的ECMAScript标准中。

## Promise.any

- fulfillment
- AgreegateError

## WeakRefrences

- WeakRef minimal supportc
- FinalizationRegistry minimal support
## Logical Assignment 逻辑赋值操作符
这个提案的目的是将逻辑运算符和赋值表达式结合。简单来说就是将 `|| && ??` 与 `=` 结合，使得原本需要两个步骤完成逻辑判断与赋值操作结合成一个步骤。该提案目前已经处于 `TC39` 流程的第四阶段，表示已完成提案。兼容性方面，截止到2020-11月，IE/Edge/safari13.1以下/
- ||= basic support
- ||= short-circuiting behavior
- ||= setter not unnecessarily invoked
- &&= basic support
- &&= short-circuiting behavior
- &&= setter not unnecessarily invoked
- ??= basic support
- ??= short-circuiting behavior
- ??= setter not unnecessarily invoked

```js
// "Or Or Equals" (or, the Mallet operator :wink:)
a ||= b;
a || (a = b);

// "And And Equals"
a &&= b;
a && (a = b);

// "QQ Equals"
a ??= b;
a ?? (a = b);
```
## Numeric Separators 数字分隔符

## 结论
希望这篇文章对你有帮助，也期待你可以将这些特性应用到你的代码中。如果想了解更多，可以看看 tc39 委员会的官方[Github仓库](https://github.com/tc39/proposals/blob/master/finished-proposals.md)，这里列举了每年 ECMAScript 标准中已经完成的提案。
如果你想要速查 ES12 在浏览器中的兼容性，请点击 [快速入口](http://kangax.github.io/compat-table/es2016plus/)，这里提供了详细的兼容性记录。