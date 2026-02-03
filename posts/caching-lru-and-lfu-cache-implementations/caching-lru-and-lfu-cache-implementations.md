---
title: 'Caching in Interviews - LRU and LFU Cache Implementations'
description: 'A hands-on guide to implementing LRU and LFU caches from scratch in Python, with the kind of clarity interviewers expect.'
slug: caching-lru-and-lfu-cache-implementations
published: '2026-02-04'
category: general
---

Caching questions are interview favorites because they test multiple things at once - data structure design, time complexity awareness, and your ability to combine simple building blocks into something efficient. Two problems show up more than any other: LRU Cache and LFU Cache.

This post walks through both implementations in Python, covering the approach, the code, and the complexity analysis you'd discuss in an interview.

## LRU Cache (Least Recently Used)

### The Problem

Design a cache with a fixed capacity that supports two operations:

- get(key) - Return the value if it exists, otherwise return -1.
- put(key, value) - Insert or update the value. If the cache is full, evict the least recently used entry.

Both operations must run in O(1) time.

### Why Hashmap + Doubly Linked List

A hashmap alone gives you O(1) lookups, but it can't track usage order. A list alone can track order, but lookups become O(n). You need both working together:

- The hashmap maps keys to nodes in the linked list, giving O(1) access to any entry.
- The doubly linked list maintains the usage order. The most recently used item sits near the head, the least recently used near the tail.
- When you access or insert an entry, you move its node to the head. When you need to evict, you remove from the tail. Both operations are O(1) with a doubly linked list.

### Implementation

```python
class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}  # key -> Node

        # Dummy head and tail to avoid edge cases
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: Node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_head(self, node: Node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._add_to_head(node)
        return node.val

    def put(self, key: int, value: int):
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._remove(node)
            self._add_to_head(node)
        else:
            if len(self.cache) == self.cap:
                # Evict from tail
                lru = self.tail.prev
                self._remove(lru)
                del self.cache[lru.key]

            node = Node(key, value)
            self.cache[key] = node
            self._add_to_head(node)
```

### Walkthrough

```python
cache = LRUCache(2)

cache.put(1, 10)    # cache: {1: 10}
cache.put(2, 20)    # cache: {1: 10, 2: 20}
cache.get(1)        # returns 10, now 1 is most recently used
cache.put(3, 30)    # evicts key 2 (least recently used), cache: {1: 10, 3: 30}
cache.get(2)        # returns -1 (evicted)
```

### Complexity

- Time: O(1) for both get and put. Hashmap lookup is O(1), linked list insert/remove is O(1).
- Space: O(capacity) for the hashmap and linked list nodes.

The dummy head and tail nodes are a small but important detail. They eliminate null checks when removing or inserting at the boundaries, keeping the code clean.

---

## LFU Cache (Least Frequently Used)

### The Problem

Same interface as LRU, but with a different eviction policy:

- get(key) - Return the value if it exists, otherwise return -1.
- put(key, value) - Insert or update the value. If the cache is full, evict the least frequently used entry. If there's a tie in frequency, evict the least recently used among them.

Both operations must run in O(1) time.

### How It Differs from LRU

LRU only cares about when something was last used. LFU cares about how many times something has been used. This means you need to track frequency counts, and within each frequency level, you still need recency ordering to break ties.

### The Data Structures

You need three hashmaps working together:

- key_to_node - Maps keys to their nodes (stores value and frequency).
- freq_to_list - Maps each frequency count to a doubly linked list of nodes with that frequency. Each list is ordered by recency.
- min_freq - Tracks the current minimum frequency so you know which list to evict from.

When a key is accessed, its frequency increases by 1, so you move it from one frequency list to the next. If the old frequency list becomes empty and it was the minimum, you bump min_freq up.

### Implementation

```python
class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.freq = 1
        self.prev = None
        self.next = None


class DoublyLinkedList:
    """A linked list that tracks its own size, with dummy head/tail."""

    def __init__(self):
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def add_to_head(self, node: Node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node
        self.size += 1

    def remove(self, node: Node):
        node.prev.next = node.next
        node.next.prev = node.prev
        self.size -= 1

    def remove_tail(self) -> Node:
        if self.size == 0:
            return None
        tail_node = self.tail.prev
        self.remove(tail_node)
        return tail_node

    def is_empty(self) -> bool:
        return self.size == 0


class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.min_freq = 0
        self.key_to_node = {}             # key -> Node
        self.freq_to_list = {}            # freq -> DoublyLinkedList

    def _update_freq(self, node: Node):
        old_freq = node.freq
        self.freq_to_list[old_freq].remove(node)

        # If old frequency list is empty and it was the min, bump min_freq
        if self.freq_to_list[old_freq].is_empty():
            del self.freq_to_list[old_freq]
            if self.min_freq == old_freq:
                self.min_freq += 1

        node.freq += 1
        if node.freq not in self.freq_to_list:
            self.freq_to_list[node.freq] = DoublyLinkedList()
        self.freq_to_list[node.freq].add_to_head(node)

    def get(self, key: int) -> int:
        if key not in self.key_to_node:
            return -1
        node = self.key_to_node[key]
        self._update_freq(node)
        return node.val

    def put(self, key: int, value: int):
        if self.cap == 0:
            return

        if key in self.key_to_node:
            node = self.key_to_node[key]
            node.val = value
            self._update_freq(node)
        else:
            if len(self.key_to_node) == self.cap:
                # Evict least frequent, least recent
                evict_list = self.freq_to_list[self.min_freq]
                evicted = evict_list.remove_tail()
                del self.key_to_node[evicted.key]
                if evict_list.is_empty():
                    del self.freq_to_list[self.min_freq]

            node = Node(key, value)
            self.key_to_node[key] = node
            self.min_freq = 1
            if 1 not in self.freq_to_list:
                self.freq_to_list[1] = DoublyLinkedList()
            self.freq_to_list[1].add_to_head(node)
```

### Walkthrough

```python
cache = LFUCache(2)

cache.put(1, 10)    # freq(1)=1, cache: {1: 10}
cache.put(2, 20)    # freq(2)=1, cache: {1: 10, 2: 20}
cache.get(1)        # returns 10, freq(1)=2 now
cache.put(3, 30)    # evicts key 2 (freq=1, least frequent), cache: {1: 10, 3: 30}
cache.get(2)        # returns -1 (evicted)
cache.get(3)        # returns 30, freq(3)=2 now
cache.put(4, 40)    # evicts key 1 or 3? Both freq=2, so evict least recent: key 1
                     # cache: {3: 30, 4: 40}
```

### Complexity

- Time: O(1) for both get and put. Every operation is a hashmap lookup plus a linked list insert/remove.
- Space: O(capacity) for the nodes, plus overhead for frequency lists.

---

## LRU vs LFU - When to Use Which

| Aspect | LRU | LFU |
|---|---|---|
| Eviction rule | Least recently used | Least frequently used (with LRU tiebreaker) |
| Good for | Access patterns with temporal locality | Access patterns with popular items |
| Weakness | Can evict frequently used items after one cold period | Stale popular items can stick around too long |
| Implementation complexity | Moderate - one hashmap, one linked list | Higher - three hashmaps, multiple linked lists |
| Interview frequency | Very common | Less common, but shows up at senior levels |

## Interview Tips

- Start by stating the O(1) requirement out loud. It shows you understand the constraint before diving in.
- Draw the data structures on the whiteboard before writing code. Show how the hashmap and linked list connect.
- Use dummy head/tail nodes. It simplifies the code and avoids off-by-one bugs under pressure.
- For LFU, explain the min_freq tracking clearly. It's the part most candidates stumble on.
- Test with a small capacity (2 or 3) and walk through put/get/eviction step by step.
