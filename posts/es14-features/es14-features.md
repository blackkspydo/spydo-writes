---
title: 'ECMAScript 2023 (ES14): A Quick Look into New Features for JavaScript Developers'
description: Comprehensive guide to ES14 features including enhanced array methods and shebang support for developers.
slug: es14-features
published: '2023-10-15'
category: javascript
---

JavaScript enthusiasts will appreciate the latest ECMAScript 2023 (ES14) release, which introduces several powerful features designed to improve developer productivity and code quality.

## The ECMAScript Specification: A Quick Refresher

The ECMAScript specification serves as the foundational document defining JavaScript's core features. As the language evolves, this specification ensures JavaScript remains relevant and powerful.

## Supercharging Arrays with New Methods

### Array.prototype.toSorted()

Creates a new sorted array without modifying the original, preventing accidental mutations when sorting.

```javascript
let arr = [5, 4, 2, 3, 1]
console.log(arr === arr.sort()) // true
console.log(arr === arr.toSorted()) // false
```

### Array.prototype.toReversed()

Produces a new reversed array while leaving the original unchanged, enabling non-destructive array operations.

```javascript
console.log(['a', 'b', 'c', 'd', 'e'].toReversed()) // ['e', 'd', 'c', 'b', 'a']
```

### Array.prototype.with()

Modifies a specific element by index and returns a new array containing that modification.

```javascript
const arr = ['I', 'am', 'the', 'Walrus']
const newArr = arr.with(3, 'Ape Man')
console.log(newArr) // ["I", "am", "the", "Ape Man"]
```

### Array.prototype.findLast() and findLastIndex()

Locate the last matching element or its index without backward iteration.

```javascript
const numbers = [54, 34, 55, 75, 98, 77]
console.log(numbers.findLast((num) => num % 2 === 0)) // 98
console.log(numbers.findLastIndex((num) => num % 6 === 0)) // 0
```

### Array.prototype.toSpliced()

Similar to `splice()`, but returns a new array instead of modifying the original.

```javascript
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
const newColors = colors.toSpliced(2, 1, 'pink', 'cyan')
console.log(newColors) // ["red", "orange", "pink", "cyan", "green", "blue", "purple"]
```

## Official Shebang Support

JavaScript now officially supports shebang (`#!`) notation for Unix-based executable scripts, enhancing its versatility for scripting purposes.

```javascript
#!/usr/bin/env node
console.log('Hello, world!')
```

## Symbols as Keys on Weak Collections

ES14 enables using Symbols as keys in weak collections, providing greater flexibility in memory management and data referencing.

```javascript
var map = new WeakMap()
let mySymbol = Symbol('FooBar')
map.set(mySymbol, 'value')
```

## Conclusion

While ES14 may appear subtle, these array manipulation enhancements significantly improve coding efficiency and enjoyment for JavaScript developers.
