// // Using Map Modern and JS way

// class LRUCache {
//   constructor(capacity) {
//     this.capacity = capacity;
//     this.cache = new Map();
//   }

//   // Retrieve an item from the cache
//   get(key) {
//     if (!this.cache.has(key)) return -1;

//     // Refresh the key by deleting and re-inserting it
//     const value = this.cache.get(key);
//     this.cache.delete(key);
//     this.cache.set(key, value);

//     return value;
//   }

//   // Insert or update an item in the cache
//   put(key, value) {
//     // If key exists, delete it first so it resets the order upon insert
//     if (this.cache.has(key)) {
//       this.cache.delete(key);
//     }

//     this.cache.set(key, value);

//     // If cache exceeds capacity, evict the oldest item
//     if (this.cache.size > this.capacity) {
//       // The first key in the map iterator is the least recently used
//       const oldestKey = this.cache.keys().next().value;
//       this.cache.delete(oldestKey);
//     }
//   }
// }

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.get(key)) return;
    let value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const oldestKey = this.map().key().next().value;
      this.cache.delete(oldestKey);
    }
  }
}
