/**
 * SignalStack Sentinel
 * A clean, reusable utility for constant-time minimum tracking.
 *
 * Use case:
 * - live telemetry dashboards
 * - QA metrics streams
 * - budget or risk tracking
 * - rollback-friendly event histories
 */
class SignalStackSentinel {
  constructor() {
    this.values = [];
    this.minimums = [];
  }

  /**
   * Returns the last item from a stack without removing it.
   * @param {Array<number>} stack
   * @returns {number | undefined}
   */
  _peek(stack) {
    return stack.length > 0 ? stack[stack.length - 1] : undefined;
  }

  /**
   * Pushes a new value into the tracker.
   * Keeps a second stack in sync for O(1) minimum lookups.
   * @param {number} value
   */
  push(value) {
    this.values.push(value);

    if (this.minimums.length === 0 || value <= this._peek(this.minimums)) {
      this.minimums.push(value);
    }
  }

  /**
   * Removes and returns the most recent value.
   * @returns {number | undefined}
   */
  pop() {
    const removedValue = this.values.pop();

    if (removedValue !== undefined && removedValue === this._peek(this.minimums)) {
      this.minimums.pop();
    }

    return removedValue;
  }

  /**
   * Returns the most recent value without removing it.
   * @returns {number | undefined}
   */
  top() {
    return this._peek(this.values);
  }

  /**
   * Returns the current minimum value in constant time.
   * @returns {number | undefined}
   */
  getMin() {
    return this._peek(this.minimums);
  }

  /**
   * Returns the number of stored values.
   * @returns {number}
   */
  size() {
    return this.values.length;
  }

  /**
   * Checks whether the tracker is empty.
   * @returns {boolean}
   */
  isEmpty() {
    return this.values.length === 0;
  }
}

module.exports = SignalStackSentinel;

/* Demo */
if (require.main === module) {
  const monitor = new SignalStackSentinel();

  monitor.push(-2);
  monitor.push(0);
  monitor.push(-3);

  console.log("Current minimum:", monitor.getMin()); // -3
  monitor.pop();
  console.log("Latest value:", monitor.top()); // 0
  console.log("Current minimum:", monitor.getMin()); // -2
}
