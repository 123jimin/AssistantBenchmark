# IdiotSort

## Prompt

````text
The following Python 3 code attempts to implement a sorting algorithm.

```py
def idiot_sort(arr: list[int]):
  if len(arr) == 1: return arr
  idiot_sort(arr[:-1])
  idiot_sort(arr[1:])
  idiot_sort(arr[:-1])

  return arr

print(idiot_sort([2, 1])) # Expected: [1, 2]
print(idiot_sort([3, 1, 4, 1, 5, 9, 2])) # Expected: [1, 1, 2, 3, 4, 5, 9]
```

1. What is the expected time complexity for this algorithm?

2. The result of the code is the following:

```text
[2, 1]
[3, 1, 4, 1, 5, 9, 2]
```

What are the problems that cause `idiot_sort` not working correctly, and how it can be fixed?
NOTE: Assume that the absurdness of the sorting algorithm - in specific the time complexity - is not part of a problem, and need not to be fixed.
````

## Answer

1. Let $f(n)$ be the amount of operations for an array of $n$ elements. The recurrence relationship for a rough \# of steps would be:
\[ f(n) = 3f(n-1) + 3n = 9f(n-2) + 9(n-1) + 3n = \cdots = 3^{n-1} + \sum_{i=2}^{n} 3^{n+1-i} i \]
It can be shown that $\sum_{i=2}^{n} 3^{n+1-i} i$ is $\Theta(3^n)$, thus the time complexity of `idiot_sort` is $\Theta(3^n)$.

2. There are two problems:
  a. No actual sorting is being done. In specific, a swap may need to be done when `len(arr) == 2`. This can be fixed easily.
  b. The array is being copied when `idiot_sort` is recursively called, so the original array is not being modified. To keep the absurdness of `idiot_sort`, let's add another set of copies to fix it.

The revised function would be:

```py
def idiot_sort(arr: list[int]):
  if len(arr) == 1:
    return arr

  if len(arr) == 2:
    arr[:] = [min(arr), max(arr)]
    return arr
  
  arr[:-1] = idiot_sort(arr[:-1])
  arr[1:] = idiot_sort(arr[1:])
  arr[:-1] = idiot_sort(arr[:-1])

  return arr
```

Of course, a sensible programmer would just do the following:

```py
arr.sort()
```

## Criteria

The task consists of two parts. Each part takes 0.5 points.

### 1. Time Complexity

- 0.5 point is awarded only when the AI correctly identifies that the algorithm's time complexity is (at least) exponential.
- Minor error or omission in computation by itself does *not* affect the point.
- Vaguely stating that the time complexity is at least exponential is fine.
- However, stating incorrectly specific time complexity (such as $\Theta( n! )$ or $\Theta( 2^n )$) would be regarded as a wrong answer.
  - One exception would be $3^n$ with some extra (sub-exponential) factors, such as $\Theta( n 3^n )$; these would be regarded as a right answer.

### 2. Fixing

- 0.5 point is awarded only when:
  - The AI correctly identifies the two main problems (no swapping done, original array not modified).
  - The code does appear to be address the two problems (attempts to actually reorder the array, not copying array arguments).
  - The fix does not affect the time compexity in a significant way. In specific, the three recursive calls need to be preserved.
- An incorrect code by itself does *not* affect the point.
- Function signature of `idiot_sort` may be modified.
