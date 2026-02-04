---
title: 'Heaps in Interviews - Priority Queue Problems and Implementations'
description: 'Implementations of four classic heap interview problems in Python, JavaScript, and TypeScript - Kth Largest, Top K Frequent, Find Median, and Merge K Sorted Lists.'
slug: heaps-priority-queue-implementations
published: '2026-02-04T12:00:00'
category: general
---

Heap problems test whether you can pick the right data structure and maintain invariants under insert and remove operations. They come up constantly in interviews because they sit at the intersection of trees, arrays, and greedy algorithms.

This post covers four classic problems in order of increasing complexity, with implementations in Python, JavaScript, and TypeScript. You can toggle between languages using the tabs on each code block. All four problems use a min-heap at their core.

## Kth Largest Element in a Stream

### The Problem

Design a class that tracks the kth largest element in a stream of numbers:

- `__init__(k, nums)` - Initialize with an integer k and a list of integers.
- `add(val)` - Add a new value to the stream and return the kth largest element.

### Why a Min-Heap of Size K

You don't need to sort everything. If you maintain a min-heap of exactly K elements, the root is always the kth largest. When a new element arrives, you only care about it if it's larger than the current kth largest.

- The heap holds the K largest elements seen so far.
- The root (smallest in the heap) is the kth largest overall.
- Adding an element that's smaller than the root changes nothing - it can't be in the top K.

### Implementation

{% codetabs %}
```python
import heapq


class KthLargest:
    def __init__(self, k: int, nums: list[int]):
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]
```

```javascript
class MinHeap {
  constructor() {
    this.heap = []
  }

  push(val) {
    this.heap.push(val)
    this._bubbleUp(this.heap.length - 1)
  }

  pop() {
    const top = this.heap[0]
    const last = this.heap.pop()
    if (this.heap.length > 0) {
      this.heap[0] = last
      this._sinkDown(0)
    }
    return top
  }

  peek() {
    return this.heap[0]
  }

  size() {
    return this.heap.length
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2)
      if (this.heap[parent] <= this.heap[i]) break
      ;[this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]]
      i = parent
    }
  }

  _sinkDown(i) {
    const n = this.heap.length
    while (true) {
      let smallest = i
      const left = 2 * i + 1
      const right = 2 * i + 2
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right
      if (smallest === i) break
      ;[this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]]
      i = smallest
    }
  }
}

class KthLargest {
  constructor(k, nums) {
    this.k = k
    this.heap = new MinHeap()
    for (const num of nums) this.add(num)
  }

  add(val) {
    this.heap.push(val)
    if (this.heap.size() > this.k) this.heap.pop()
    return this.heap.peek()
  }
}
```

```typescript
class MinHeap {
  private heap: number[] = []

  push(val: number): void {
    this.heap.push(val)
    this.bubbleUp(this.heap.length - 1)
  }

  pop(): number {
    const top = this.heap[0]
    const last = this.heap.pop()!
    if (this.heap.length > 0) {
      this.heap[0] = last
      this.sinkDown(0)
    }
    return top
  }

  peek(): number {
    return this.heap[0]
  }

  size(): number {
    return this.heap.length
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2)
      if (this.heap[parent] <= this.heap[i]) break
      ;[this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]]
      i = parent
    }
  }

  private sinkDown(i: number): void {
    const n = this.heap.length
    while (true) {
      let smallest = i
      const left = 2 * i + 1
      const right = 2 * i + 2
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right
      if (smallest === i) break
      ;[this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]]
      i = smallest
    }
  }
}

class KthLargest {
  private k: number
  private heap: MinHeap

  constructor(k: number, nums: number[]) {
    this.k = k
    this.heap = new MinHeap()
    for (const num of nums) this.add(num)
  }

  add(val: number): number {
    this.heap.push(val)
    if (this.heap.size() > this.k) this.heap.pop()
    return this.heap.peek()
  }
}
```
{% endcodetabs %}

### Walkthrough

```python
kth = KthLargest(3, [4, 5, 8, 2])
# After init: heap = [4, 5, 8] (trimmed to size 3, root = 4 = 3rd largest)

kth.add(3)   # heap = [4, 5, 8], 3 < root so pushed and popped -> returns 4
kth.add(5)   # heap = [5, 5, 8], pushed 5, popped 4 -> returns 5
kth.add(10)  # heap = [5, 8, 10], pushed 10, popped 5 -> returns 5
kth.add(9)   # heap = [8, 9, 10], pushed 9, popped 5 -> returns 8
kth.add(4)   # heap = [8, 9, 10], 4 < root so pushed and popped -> returns 8
```

### Complexity

- Time: O(n log K) for initialization (heapify + trim), O(log K) per `add` call.
- Space: O(K) for the heap.

The key insight is that you never need more than K elements. A sorted array would give you O(1) lookups but O(n) inserts. The heap trades O(1) lookup for O(log K) insert and lookup combined.

---

## Top K Frequent Elements

### The Problem

Given an integer array and an integer k, return the k most frequent elements. The answer can be in any order.

### The Approach

This is a two-phase problem:

1. Count frequencies with a hashmap.
2. Select the top K from those frequencies.

For step 2, a min-heap of size K works well. Push `(frequency, element)` pairs. If the heap exceeds size K, pop the smallest. After processing all elements, the heap holds the K most frequent.

### Implementation

{% codetabs %}
```python
from collections import Counter
import heapq


def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    heap = []

    for num, freq in count.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)

    return [num for freq, num in heap]
```

```javascript
function topKFrequent(nums, k) {
  const count = new Map()
  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1)
  }

  // Bucket sort - index = frequency
  const buckets = Array.from({ length: nums.length + 1 }, () => [])
  for (const [num, freq] of count) {
    buckets[freq].push(num)
  }

  const result = []
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i])
  }
  return result.slice(0, k)
}
```

```typescript
function topKFrequent(nums: number[], k: number): number[] {
  const count = new Map<number, number>()
  for (const num of nums) {
    count.set(num, (count.get(num) ?? 0) + 1)
  }

  // Bucket sort - index = frequency
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => [])
  for (const [num, freq] of count) {
    buckets[freq].push(num)
  }

  const result: number[] = []
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i])
  }
  return result.slice(0, k)
}
```
{% endcodetabs %}

### Walkthrough

```python
nums = [1, 1, 1, 2, 2, 3]
k = 2

# Step 1 - count: {1: 3, 2: 2, 3: 1}

# Step 2 - heap processing:
# Push (3, 1) -> heap = [(3, 1)]
# Push (2, 2) -> heap = [(2, 2), (3, 1)]
# Push (1, 3) -> heap = [(1, 3), (3, 1), (2, 2)] -> pop (1, 3) -> heap = [(2, 2), (3, 1)]

# Result: [2, 1]
```

### The O(n) Alternative - Bucket Sort

If you want to skip the heap entirely, bucket sort gets you O(n). Create an array of buckets where index = frequency, then collect elements from the highest bucket down.

```python
from collections import Counter


def top_k_frequent_bucket(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]

    for num, freq in count.items():
        buckets[freq].append(num)

    result = []
    for i in range(len(buckets) - 1, -1, -1):
        for num in buckets[i]:
            result.append(num)
            if len(result) == k:
                return result
    return result
```

### Complexity

- Heap approach: O(n log K) time, O(n) space for the hashmap.
- Bucket sort: O(n) time, O(n) space.

Mentioning both approaches in an interview shows range. The heap generalizes better (works with streams), while bucket sort is optimal for fixed input.

---

## Find Median from Data Stream

### The Problem

Design a data structure that supports two operations:

- `addNum(num)` - Add an integer from the data stream.
- `findMedian()` - Return the median of all elements added so far. If the count is even, return the average of the two middle values.

### Why Two Heaps

A sorted array gives O(1) median access but O(n) inserts. A single heap can find the min or max efficiently, but not the middle. The trick is to split the data into two halves:

- A max-heap (`lo`) holds the smaller half. Its root is the largest of the small elements.
- A min-heap (`hi`) holds the larger half. Its root is the smallest of the large elements.

The median is either the root of `lo` (odd count) or the average of both roots (even count).

The balancing rule: `lo` can have at most one more element than `hi`. This keeps the median accessible at the roots.

### Implementation

{% codetabs %}
```python
import heapq


class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap (store negated values)
        self.hi = []  # min-heap

    def addNum(self, num: int):
        heapq.heappush(self.lo, -num)
        # Move the largest from lo to hi
        heapq.heappush(self.hi, -heapq.heappop(self.lo))

        # Rebalance: lo should have >= elements than hi
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self) -> float:
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2
```

```javascript
class MedianFinder {
  constructor() {
    this.lo = [] // max-heap (negate values)
    this.hi = [] // min-heap
  }

  addNum(num) {
    heapPush(this.lo, -num)
    heapPush(this.hi, -heapPop(this.lo))

    if (this.hi.length > this.lo.length) {
      heapPush(this.lo, -heapPop(this.hi))
    }
  }

  findMedian() {
    if (this.lo.length > this.hi.length) {
      return -this.lo[0]
    }
    return (-this.lo[0] + this.hi[0]) / 2
  }
}

// Min-heap helpers
function heapPush(heap, val) {
  heap.push(val)
  let i = heap.length - 1
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2)
    if (heap[parent] <= heap[i]) break
    ;[heap[parent], heap[i]] = [heap[i], heap[parent]]
    i = parent
  }
}

function heapPop(heap) {
  const top = heap[0]
  const last = heap.pop()
  if (heap.length > 0) {
    heap[0] = last
    let i = 0
    while (true) {
      let smallest = i
      const l = 2 * i + 1
      const r = 2 * i + 2
      if (l < heap.length && heap[l] < heap[smallest]) smallest = l
      if (r < heap.length && heap[r] < heap[smallest]) smallest = r
      if (smallest === i) break
      ;[heap[smallest], heap[i]] = [heap[i], heap[smallest]]
      i = smallest
    }
  }
  return top
}
```

```typescript
class MedianFinder {
  private lo: number[] = [] // max-heap (negate values)
  private hi: number[] = [] // min-heap

  addNum(num: number): void {
    heapPush(this.lo, -num)
    heapPush(this.hi, -heapPop(this.lo))

    if (this.hi.length > this.lo.length) {
      heapPush(this.lo, -heapPop(this.hi))
    }
  }

  findMedian(): number {
    if (this.lo.length > this.hi.length) {
      return -this.lo[0]
    }
    return (-this.lo[0] + this.hi[0]) / 2
  }
}

function heapPush(heap: number[], val: number): void {
  heap.push(val)
  let i = heap.length - 1
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2)
    if (heap[parent] <= heap[i]) break
    ;[heap[parent], heap[i]] = [heap[i], heap[parent]]
    i = parent
  }
}

function heapPop(heap: number[]): number {
  const top = heap[0]
  const last = heap.pop()!
  if (heap.length > 0) {
    heap[0] = last
    let i = 0
    while (true) {
      let smallest = i
      const l = 2 * i + 1
      const r = 2 * i + 2
      if (l < heap.length && heap[l] < heap[smallest]) smallest = l
      if (r < heap.length && heap[r] < heap[smallest]) smallest = r
      if (smallest === i) break
      ;[heap[smallest], heap[i]] = [heap[i], heap[smallest]]
      i = smallest
    }
  }
  return top
}
```
{% endcodetabs %}

Python's `heapq` is min-heap only. To simulate a max-heap, negate values on push and negate again on pop. The `lo` heap stores `-num` so that the smallest negated value (the root) corresponds to the largest actual value. JavaScript and TypeScript use the same negation trick with manual heap helpers since neither has a built-in heap.

### Walkthrough

```python
mf = MedianFinder()

mf.addNum(1)
# lo = [-1], hi = []
# median = 1

mf.addNum(2)
# Push -2 to lo -> lo = [-2, -1]
# Move max to hi -> lo = [-1], hi = [2]
# Balanced -> no rebalance
# median = (1 + 2) / 2 = 1.5

mf.addNum(3)
# Push -3 to lo -> lo = [-3, -1]
# Move max to hi -> lo = [-1], hi = [2, 3]
# hi is larger -> move 2 to lo -> lo = [-2, -1], hi = [3]
# median = 2

mf.addNum(4)
# Push -4 to lo -> lo = [-4, -1, -2]
# Move max to hi -> lo = [-2, -1], hi = [3, 4]
# Balanced -> no rebalance
# median = (2 + 3) / 2 = 2.5
```

### Complexity

- Time: O(log n) per `addNum`, O(1) for `findMedian`.
- Space: O(n) for storing all elements across both heaps.

The `addNum` method always does exactly 2-3 heap operations regardless of input, which keeps the logic predictable. The push-then-rebalance pattern avoids complex conditional branching.

---

## Merge K Sorted Lists

### The Problem

Given an array of k sorted linked lists, merge them into one sorted linked list.

### Why a Min-Heap

The brute-force approach compares the heads of all k lists on every step - O(K) per node, O(NK) total. A min-heap reduces that comparison to O(log K) per node.

- Start by pushing the head of each list into a min-heap.
- Pop the smallest node, append it to the result.
- If that node has a next pointer, push the next node into the heap.
- Repeat until the heap is empty.

The heap always holds at most K nodes (one from each list), so each push/pop is O(log K).

### Implementation

{% codetabs %}
```python
import heapq


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def merge_k_lists(lists: list[ListNode]) -> ListNode:
    heap = []

    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode()
    current = dummy

    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next

        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next
```

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val
    this.next = next
  }
}

function mergeKLists(lists) {
  const heap = [] // min-heap of [val, listIndex, node]

  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) heapPush(heap, [lists[i].val, i, lists[i]])
  }

  const dummy = new ListNode()
  let current = dummy

  while (heap.length > 0) {
    const [val, i, node] = heapPop(heap)
    current.next = node
    current = current.next

    if (node.next) {
      heapPush(heap, [node.next.val, i, node.next])
    }
  }

  return dummy.next
}

function heapPush(heap, entry) {
  heap.push(entry)
  let i = heap.length - 1
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2)
    if (heap[parent][0] <= heap[i][0]) break
    ;[heap[parent], heap[i]] = [heap[i], heap[parent]]
    i = parent
  }
}

function heapPop(heap) {
  const top = heap[0]
  const last = heap.pop()
  if (heap.length > 0) {
    heap[0] = last
    let i = 0
    while (true) {
      let smallest = i
      const l = 2 * i + 1
      const r = 2 * i + 2
      if (l < heap.length && heap[l][0] < heap[smallest][0]) smallest = l
      if (r < heap.length && heap[r][0] < heap[smallest][0]) smallest = r
      if (smallest === i) break
      ;[heap[smallest], heap[i]] = [heap[i], heap[smallest]]
      i = smallest
    }
  }
  return top
}
```

```typescript
class ListNode {
  val: number
  next: ListNode | null

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val
    this.next = next
  }
}

type HeapEntry = [number, number, ListNode] // [val, listIndex, node]

function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  const heap: HeapEntry[] = []

  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) heapPush(heap, [lists[i]!.val, i, lists[i]!])
  }

  const dummy = new ListNode()
  let current = dummy

  while (heap.length > 0) {
    const [val, i, node] = heapPop(heap)
    current.next = node
    current = current.next

    if (node.next) {
      heapPush(heap, [node.next.val, i, node.next])
    }
  }

  return dummy.next
}

function heapPush(heap: HeapEntry[], entry: HeapEntry): void {
  heap.push(entry)
  let i = heap.length - 1
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2)
    if (heap[parent][0] <= heap[i][0]) break
    ;[heap[parent], heap[i]] = [heap[i], heap[parent]]
    i = parent
  }
}

function heapPop(heap: HeapEntry[]): HeapEntry {
  const top = heap[0]
  const last = heap.pop()!
  if (heap.length > 0) {
    heap[0] = last
    let i = 0
    while (true) {
      let smallest = i
      const l = 2 * i + 1
      const r = 2 * i + 2
      if (l < heap.length && heap[l][0] < heap[smallest][0]) smallest = l
      if (r < heap.length && heap[r][0] < heap[smallest][0]) smallest = r
      if (smallest === i) break
      ;[heap[smallest], heap[i]] = [heap[i], heap[smallest]]
      i = smallest
    }
  }
  return top
}
```
{% endcodetabs %}

The tuple `(node.val, i, node)` deserves explanation. Python's `heapq` compares tuples element by element. If two nodes have the same value, it would try to compare the nodes themselves, which fails. The index `i` acts as a tiebreaker so node comparison never happens. The JavaScript version uses arrays with the same `[val, index, node]` pattern.

### Walkthrough

```python
# List 1: 1 -> 4 -> 5
# List 2: 1 -> 3 -> 4
# List 3: 2 -> 6

# Initial heap: [(1, 0, node1), (1, 1, node2), (2, 2, node3)]

# Pop (1, 0, node1) -> result: 1, push (4, 0, node1.next)
# Heap: [(1, 1, node2), (2, 2, node3), (4, 0, ...)]

# Pop (1, 1, node2) -> result: 1 -> 1, push (3, 1, node2.next)
# Heap: [(2, 2, node3), (4, 0, ...), (3, 1, ...)]

# Pop (2, 2, node3) -> result: 1 -> 1 -> 2, push (6, 2, node3.next)
# Pop (3, 1, ...)   -> result: 1 -> 1 -> 2 -> 3, push (4, 1, ...)
# Pop (4, 0, ...)   -> result: 1 -> 1 -> 2 -> 3 -> 4, push (5, 0, ...)
# Pop (4, 1, ...)   -> result: 1 -> 1 -> 2 -> 3 -> 4 -> 4, no next
# Pop (5, 0, ...)   -> result: ... -> 5, no next
# Pop (6, 2, ...)   -> result: ... -> 6, no next

# Final: 1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 6
```

### Complexity

- Time: O(N log K) where N is the total number of nodes across all lists. Each node is pushed and popped from the heap exactly once.
- Space: O(K) for the heap. The result list reuses existing nodes.

The dummy head pattern appears here again, just like in linked list cache implementations. It eliminates the special case for the first node.

---

## When to Use Which

| Problem | Data Structures | Time (per op) | Key Insight |
|---|---|---|---|
| Kth Largest | Min-heap of size K | O(log K) | Small heap keeps only what matters |
| Top K Frequent | Hashmap + min-heap | O(n log K) | Count first, select second |
| Find Median | Max-heap + min-heap | O(log n) | Split data into two halves |
| Merge K Sorted | Min-heap of K nodes | O(N log K) | Heap replaces brute-force comparison |

All four problems use min-heaps, but in different ways. Kth Largest and Top K Frequent use a fixed-size heap as a filter. Find Median uses two heaps to maintain a partition. Merge K Sorted uses a heap as a multi-way comparison tool.

## Interview Tips

- Always clarify whether you need a min-heap or max-heap. Python's `heapq` is min-heap only - negate values for max-heap behavior.
- State the heap size constraint up front. A heap of size K gives O(log K) operations, while a heap of size N gives O(log N). This distinction matters for complexity analysis.
- For "Top K" problems, mention the bucket sort alternative even if you implement the heap version. It shows you know the O(n) approach exists.
- Draw the heap state for 2-3 operations before writing code. Interviewers want to see that you understand the invariant, not just the API.
- For the two-heap median problem, explain the balancing rule clearly before implementing. It's the part that separates a good answer from a great one.
