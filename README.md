# func-generators
Functional transformations for JavaScript generator functions

## API Reference

### Generator transformations

#### `genMap(f, gen)`

___Curried___
 
_(a -> b) -> Generator a -> Generator b_
 
Produces a new generator with the values of `gen` transformed via `f`
 
_Example:_

```js
genMap(x => x * x, genInfinite()); // generator for 0, 1, 4, 9, 16, ...
```

#### `genFilter(pred, gen)`

___Curried___

_(a -> Boolean) -> Generator a -> Generator a_

Produces a new generator with only the values in `gen` that produce a true value when `pred` is applied to them.

_Example:_

```js
genFilter(x => x % 3 === 0, genInfinite()); // generator for 0, 3, 6, 9, 12, ...
```

#### `genZip(gen1, gen2)`

___Curried___

_Generator a -> Generator b -> Generator [a, b]_

Produces a new generator of length-2 arrays containing the sequential values of `gen1` and `gen2`

The length of the resulting generator will be the shorter of the lengths of `gen1` and `gen2`.

_Example:_

```js
genZip(genInfinite(), genInfinite(1));   // generator for [0, 1], [1, 2], [2, 3], ...
