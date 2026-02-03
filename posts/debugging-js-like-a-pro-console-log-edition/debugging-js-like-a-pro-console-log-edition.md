---
title: 'Debugging JavaScript Like a Pro: Mastering the Different Types of Console Logs'
description: Guide to console methods including assert(), table(), and trace() for improved debugging.
slug: debugging-js-like-a-pro-console-log-edition
published: '2023-02-28'
category: javascript
---

Frontend developers regularly face debugging challenges. While `console.log()` remains the default choice, the browser's console API offers numerous specialized methods that enhance efficiency and provide clearer insights into code behavior. This guide explores the complete console API toolkit.

## Console.log() - The Basic Tool

The fundamental logging method outputs values to the console. A useful technique involves logging variables as objects:

```javascript
const name = 'Foo Bahadur'
console.log({ name })
// { name: 'Foo Bahadur' }
```

However, this method is not very useful when it comes to debugging advanced issues.

## Console.table() - Visualizing Data

Perfect for displaying arrays of objects in a formatted table structure:

```javascript
const users = [
  { name: 'Foo', age: 25 },
  { name: 'Bar', age: 30 },
  { name: 'Baz', age: 35 },
]

console.table(users)
```

This renders as a structured table in the console.

## Console.error(), .warn() & .info() - Color-Coded Methods

These methods provide visual differentiation and stack traces:

```javascript
console.error('Something went wrong!')
console.warn('This is a warning!')
console.info('This is an info message!')
```

The color-coded approach makes issues immediately visible and provides context about their origin.

## Console.time(), .timeLog() & .timeEnd() - Performance Measurement

Track execution duration across multiple checkpoints:

```javascript
console.time('fetching data')
fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => {
    console.timeLog('fetching data', 'Finished fetching data', 'with', json.length, 'users')
    console.timeLog('fetching data', 'Starting expensive operation')
    expensiveOperation(json)
    console.timeLog('fetching data', 'Finished expensive operation')
    console.timeEnd('fetching data')
  })
```

Output displays elapsed milliseconds at each checkpoint.

## Console.group() & .groupEnd() - Organizing Logs

Hierarchically organize related console statements:

```javascript
console.group('Users')
console.log('Foo')
console.log('Bar')
console.log('Baz')
console.groupEnd('Users')
```

This creates an expandable/collapsible group structure.

## Console.count() - Tracking Execution

Monitor how many times code executes at a specific location:

```javascript
console.count('foo')
console.count('bar')
console.count('foo')
console.count('bar')
console.count('foo')

// foo: 1
// bar: 1
// foo: 2
// bar: 2
// foo: 3
```

## Console.clear() - Resetting Output

Simple method to clear all console messages:

```javascript
console.clear()
```

## Console.assert() - Conditional Logging

Log messages only when conditions fail:

```javascript
console.assert(1 === 2, 'This is wrong!')
console.assert(1 === 1, 'This is right!')

// Assertion failed: This is wrong!
```

This replaces repetitive `if` statement patterns.

## Console.trace() - Call Stack Inspection

Display the complete function call stack:

```javascript
function foo() {
  function bar() {
    console.trace()
  }
  bar()
}
foo()

// console.trace()
//     at bar
//     at foo
```

## Conclusion

The console API provides a wide range of specialized tools for different debugging scenarios. Moving beyond `console.log()` enables developers to make informed choices about which method best serves each debugging context, ultimately improving code quality and development efficiency.

## Resources

- [MDN - Console](https://developer.mozilla.org/en-US/docs/Web/API/console)
