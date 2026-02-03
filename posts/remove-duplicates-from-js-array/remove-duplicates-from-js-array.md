---
title: Remove Duplicates from Javascript Array
description: Remove duplicates from Javascript Array using Set, reduce, and filter methods.
slug: remove-duplicates-from-js-array
published: '2022-10-10'
category: javascript
---

## Problem

You have an array of objects and you want to remove duplicates from it.

```javascript
const arr = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
  { id: 3, name: 'Jack' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
  { id: 4, name: 'Jill' },
  { id: 3, name: 'Jack' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
  { id: 5, name: 'Jenny' },
  { id: 4, name: 'Jill' },
  { id: 3, name: 'Jack' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
]
```

## Solutions

### Using Set

```javascript
const unique = [...new Set(arr.map((item) => item.id))].map((id) => {
  return arr.find((item) => item.id === id)
})
```

### Using reduce

```javascript
const unique = arr.reduce((acc, current) => {
  const x = acc.find((item) => item.id === current.id)
  if (!x) {
    return acc.concat([current])
  } else {
    return acc
  }
}, [])
```

### Using filter

```javascript
const unique = arr.filter((item, index, self) => {
  return index === self.findIndex((t) => t.id === item.id)
})
```

## References

- [Set - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
