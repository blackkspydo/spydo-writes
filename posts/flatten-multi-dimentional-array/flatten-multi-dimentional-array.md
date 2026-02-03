---
title: Flatten Multidimensional Array with Javascript
description: Flatten your deeply nested multi-dimentional array with this simple Javascript trick.
slug: flatten-multi-dimentional-array
published: '2022-10-10'
category: javascript
---

## Problem

You have a nested array structure and you want to convert it into a single-dimensional array.

```javascript
const arr = [[1, 2], [3, 4], [5, 6, [7, 8, [9, 10]]]]
```

## Solution

The approach uses `Array.prototype.reduce()` combined with recursion. The method checks whether each element is an array using `Array.isArray()`. For arrays, it recursively flattens nested structures; for non-arrays, it appends values directly.

```javascript
const flatten = (arr) =>
  arr.reduce(
    (acc, val) => (Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val)),
    []
  )
```

## Usage

```javascript
flatten(arr) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## References

- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.concat() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
