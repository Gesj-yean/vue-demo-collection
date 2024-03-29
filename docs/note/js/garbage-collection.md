# 垃圾回收机制

#### 基本思路

确定哪个变量不再使用，然后释放它占用的内存。过程是周期性的，垃圾回收程序每隔一段时间就自动运行。

#### 垃圾回收策略

最常用的策略是标记清理，不常用引用计数。

**标记清理**：先标记所有，再去掉被引用变量的标记，剩余的就是待删除的，最后销毁带标记的。

**引用计数**：引用时计数加一，被覆盖时减一。为0清除。严重问题：循环引用无法释放内存。

#### 性能

垃圾回收机制回周期运行，如果内存中分配很多变量会造成性能损失，因此时间调度很重要。

#### 内存管理

优化内存最佳手段：

1. 全局变量的解除引用
2. 尽量使用let const
3. 共享隐藏类，避免“先创建再补充”式的动态属性赋值，需要把不使用的属性设置为null

内存泄漏原因：

1. 意外的全局声明（被创建到window上了）
2. 定时器的回调通过闭包引用外部变量
3. js闭包