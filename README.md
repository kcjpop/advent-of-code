# Advent of Code 2022 in Flix 0.34.0

![](https://github.com/kcjpop/advent-of-code-2022/actions/workflows/flix.yml/badge.svg)

Learn Flix while playing with Advent of Code 2022.

## To run

You need to have Java >= 11 installed, then run:

```bash
$ java -jar flix.jar run
```

## Notes

### Day 01

### Day 02

### Day 03

- When doing recursion, the stop case should be first. Or actually make sure it will eventually match.

```flix
def f(acc, xs) = match List.splitAt(3, xs) {
  case (z, Nil) => acc ::: z :: Nil
  case (x, y) => f(acc ::: x :: Nil, y)
}
```

- To make a list of list:

```flix
let acc = nil; // An empty list, e.g. []
let a = 1 :: 2 :: Nil; // [1, 2]
let b = 3 :: 4 :: Nil; // [3, 4]

acc ::: a :: Nil ::: b :: Nil; // [[1, 2], [3, 4]]
```

### Day 04

- To match more than 2 elements of a list:

```flix
match xs {
    case a :: b :: _t => a + b
    case _ :: Nil => 0
    case Nil => 0
}
```

- There is that `||>` operator that can apply a pair into a function, e.g. `(3, 6) ||> Set.range`
