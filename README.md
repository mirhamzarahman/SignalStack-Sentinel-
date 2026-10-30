# SignalStack Sentinel 🔔

> Real-time minimum tracking for live streams, dashboards, and rollback-friendly systems.

## Overview

**SignalStack Sentinel** is a lightweight JavaScript utility that keeps a stream of values in order while exposing the current minimum in constant time. It is ideal for telemetry dashboards, QA traces, budget monitors, and any workflow where the latest state and the lowest observed value must always be available instantly.

## Real-World Conceptual Scenario

Imagine a monitoring service that records system health scores every few seconds. Operators need to:

- push a new reading when it arrives,
- remove the latest reading during a correction,
- inspect the most recent value,
- and query the lowest score seen so far.

SignalStack Sentinel models that workflow with a **dual-stack design**.

## Core Concept

This project uses two stacks:

- **values** — stores every pushed item in order
- **minimums** — stores only the values that are currently the lowest at each stage

That means the minimum is always available instantly, even after many updates.

## How the System Works

1. Push a value into the main stack.
2. Compare it with the current minimum.
3. Push it into the minimum stack only when it becomes a new floor.
4. On pop, remove from both stacks when the removed value matches the current minimum.
5. Read the top or minimum in **O(1)** time.

## Algorithm / Data Structure

| Part | Purpose |
|---|---|
| Main stack | Stores the full history of values |
| Minimum stack | Tracks the current lowest value at each moment |
| Pattern | Auxiliary stack / monotonic minimum tracking |

## Step-by-Step Logic

- Add the incoming value to the main stack.
- If it is smaller than or equal to the current minimum, also store it in the minimum stack.
- When removing the top value, remove it from the minimum stack too if it matches the current minimum.
- `top()` returns the most recent value.
- `getMin()` returns the smallest value currently available.

## Key Features

- ⚡ Constant-time minimum lookup
- 🧠 Clean dual-stack design
- 🔄 Rollback-friendly updates
- 📈 Great for live metrics and event streams
- 🧩 Simple JavaScript API
- 🛠️ Easy to extend for max tracking or snapshots

## Example Use Case

A QA dashboard records live stability scores for a system:

- 7 → system looks healthy
- 3 → warning signal
- 5 → recovery begins

At any moment, the dashboard can instantly show the lowest score without scanning the whole history.

## Example Input / Output

```js
const tracker = new SignalStackSentinel();

tracker.push(7);
tracker.push(3);
tracker.push(5);

console.log(tracker.getMin()); // 3
tracker.pop();                 // removes 5
console.log(tracker.top());    // 3
console.log(tracker.getMin()); // 3
```

### Result

```text
3
3
3
```

## Time and Space Complexity

| Operation | Time | Space |
|---|---:|---:|
| `push()` | O(1) | O(1) |
| `pop()` | O(1) | O(1) |
| `top()` | O(1) | O(1) |
| `getMin()` | O(1) | O(1) |

**Overall space usage:** O(n)

## Technologies Used

| Technology | Purpose |
|---|---|
| JavaScript (ES6+) | Core implementation |
| Node.js | Local execution and testing |
| GitHub Markdown | Project documentation |

## Project Structure

```text
SignalStack-Sentinel/
├── index.js
└── README.md
```

## How to Run the Project

Clone the repository:

```bash
git clone https://github.com/mirhamzarahman/SignalStack-Sentinel.git
cd SignalStack-Sentinel
node index.js
```

> Repository name: **SignalStack-Sentinel**

## Learning Outcomes

- How to design an auxiliary data structure for fast queries
- How to keep a minimum value available in constant time
- How to build a small reusable utility from an algorithmic idea
- How to write a clean, readable JavaScript class

## Possible Future Improvements

- Add maximum tracking with a second helper stack
- Support snapshot and restore states
- Publish as an npm package
- Add automated unit tests
- Expose event hooks for dashboards and observability tools

## License

Released under the **MIT License**.
