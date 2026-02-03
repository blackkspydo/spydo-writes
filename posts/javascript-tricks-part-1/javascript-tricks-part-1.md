---
title: "Javascript Tricks You've Never Heard About: Part 1"
description: Exploration of lesser-known JavaScript features including destructuring, spread operators, and optional chaining.
slug: javascript-tricks-part-1
published: '2022-10-12'
category: javascript
---

## 1. Destructuring

### 1.1. Swap Variables

You can swap two variables with the help of destructuring:

```javascript
let a = 1
let b = 2
;[a, b] = [b, a]
console.log(a, b) // 2 1
```

### 1.2. Accessing Nested Objects

Instead of chaining dot notation like `obj.a.b.c`, use destructuring for cleaner syntax:

```javascript
const obj = { a: { b: { c: 1 } } }
const {
  a: {
    b: { c },
  },
} = obj
console.log(c) // 1
```

You can also rename variables during destructuring: `const { a: { b: { c: value } } } = obj;`

### 1.3. Pass an Object as Function Parameters

If you want to pass different parameters to a function, why not pass an object instead? This improves readability and allows destructuring within function signatures:

```javascript
function foo({ a, b, c }) {
  console.log(a, b, c)
}
foo({ a: 1, b: 2, c: 3 }) // 1 2 3
```

## 2. Spread & Rest Operators

### 2.1. Spread Operator

The `...` operator spreads arrays into individual elements or objects into key-value pairs.

**In Function Calls:**

```javascript
function foo(a, b, c) {
  console.log(a, b, c)
}
const arr = [1, 2, 3]
foo(...arr) // 1 2 3
```

**In Array Literals:**

```javascript
const arr = [1, 2, 3]
const arr2 = [...arr, 4, 5, 6]
console.log(arr2) // [1, 2, 3, 4, 5, 6]
```

**In Object Literals:**

```javascript
const obj = { a: 1, b: 2, c: 3 }
const obj2 = { ...obj, d: 4, e: 5, f: 6 }
console.log(obj2) // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }
```

### 2.2. Rest Operator

The rest operator collects multiple elements into arrays or objects:

```javascript
const arr = [1, 2, 3, 4, 5]
const [first, second, ...rest] = arr
console.log(first, second, rest) // 1 2 [3, 4, 5]
```

```javascript
const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
const { a, b, ...rest } = obj
console.log(a, b, rest) // 1 2 { c: 3, d: 4, e: 5 }
```

## 3. Ternary Operator

The ternary operator is the only operator that takes three operands. It is often used as a shortcut for the `if` statement:

```javascript
const a = 1
const b = 2
const c = a > b ? a : b
console.log(c) // 2
```

## 4. Template Literals

Template literals enable string interpolation and multi-line strings using backticks:

```javascript
const name = 'John'
const age = 20
const str = `Hello, my name is ${name}
I'm ${age} years old.`
console.log(str)
// Hello, my name is John
// I'm 20 years old.
```

## 5. Short-circuiting

### 5.1. Logical AND (&&)

The logical AND operator (`&&`) returns the value of the first operand if it can be converted to `false`; otherwise, it returns the value of the second operand.

```javascript
const a = 1
const b = 2
const c = a && b
console.log(c) // 2
```

### 5.2. Logical OR (||)

The logical OR operator (`||`) returns the value of the first operand if it can be converted to `true`; otherwise, it returns the value of the second operand.

```javascript
const a = 1
const b = 2
const c = a || b
console.log(c) // 1
```

### 5.3. Nullish Coalescing Operator (??)

The nullish coalescing operator (`??`) returns its right-hand side operand when its left-hand side operand is `null` or `undefined`. The key difference from `||` is that `??` only checks for `null`/`undefined`, not falsy values.

```javascript
const a = 1
const b = 2
const c = a ?? b
console.log(c) // 1
```

## 6. Immediately Invoked Function Expression (IIFE)

An IIFE is a JavaScript function that runs as soon as it is defined. One of the most common uses is to execute a function without polluting the global scope.

```javascript
;(function () {
  console.log('Hello, World!')
})()
// Hello, World!
```

## 7. Comma Operator

The comma operator (`,`) is used to evaluate each of its operands (from left to right) and return the value of the last operand.

```javascript
const a = (1, 2, 3)
console.log(a) // 3
```

## 8. Optional Chaining

With the optional chaining operator (`?.`), you can access properties of nested objects without having to check if the parent objects exist.

```javascript
const obj = {
  a: {
    b: {
      c: 1,
    },
  },
}
const c = obj?.a?.b?.c
console.log(c) // 1
```

## 9. Double Bang (!!) Operator

The double bang operator (`!!`) is used to convert any value to a boolean.

```javascript
const a = 1
const b = !!a
console.log(b) // true
```

## 10. Double Tilde (~~) Operator

The double tilde operator (`~~`) is used to convert any value to an integer.

```javascript
const a = 1.5
const b = ~~a
console.log(b) // 1
```
