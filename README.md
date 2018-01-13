# func-generators
Functional transformations for JavaScript generator functions

## API Reference

### Generator transformations

#### <a name='genMap'></a>`genMap(f, gen)`

___Curried___
 
_(a -> b) -> Generator a -> Generator b_
 
Returns a new generator with the values of `gen` transformed via `f`
 
_Example:_

```js
genMap(x => x * x, genInfinite()); // generator for 0, 1, 4, 9, 16, ...
```

#### <a name='genFilter'></a>`genFilter(pred, gen)`

___Curried___

_(a -> Boolean) -> Generator a -> Generator a_

Returns a new generator with only the values in `gen` that produce a true value when `pred` is applied to them.

_Example:_

```js
genFilter(x => x % 3 === 0, genInfinite()); // generator for 0, 3, 6, 9, 12, ...
```

#### <a name='genZip'></a>`genZip(gen1, gen2)`

___Curried___

_Generator a -> Generator b -> Generator [a, b]_

Returns a new generator of length-2 arrays containing the sequential values of `gen1` and `gen2`

The length of the resulting generator will be the shorter of the lengths of `gen1` and `gen2`.

_Example:_

```js
genZip(genInfinite(), genInfinite(1));   // generator for [0, 1], [1, 2], [2, 3], ...
```

#### <a name='genTake'></a>`genTake(count, gen)`

___Curried___

_Number -> Generator a -> Generator a_

Returns a new generator which produces the first `count` values produced by `gen`, or all of the values produced by `gen`, whichever is fewer.

_Example:_

```js
genTake(3, genInfinite());   // generator for 0, 1, 2
```

#### <a name='genDrop'></a>`genDrop(count, gen)`

___Curried___

_Number -> Generator a -> Generator a_

Returns a new generator which produces the same values as `gen`, but without the first `count` values. If `count` is greater than the number of values produced by `gen`, the resulting generator will produce no values.

_Example:_

```js
genDrop(4, genInfinite());   // generator for 4, 5, 6, 7, 8, ...
```

### Generator convergence

#### <a name='genHead'></a>`genHead(gen)`

_Generator a -> a_

Executes `gen` and returns the first value that it produces. 

Returns `undefined` if `gen` does not produce any values.

_Example:_

```js
genHead(genInfinite(7));    // 7
```

#### <a name='genLast'></a>`genLast(gen)`

_Generator a -> a_

Executes `gen` and returns the last value that it produces.

Returns `undefined` if `gen` does not produce any values.

**Caution:** Will block until `gen` finishes producing values and will block indefinitely if `gen` does not terminate.

_Example:_

```js
genLast(genTimes(6));    // 5
```

#### <a name='genLength'></a>`genLength(gen)`

_Generator a -> Number_

Executes `gen` and returns the total number of values that it produces.

**Caution:** Will block until `gen` finishes producing values and will block indefinitely if `gen` does not terminate.

_Example:_

```js
genLength(genTake(6));    // 6
```

### Generator creation

#### <a href='genInfinite'></a>`genInfinite(start = 0, step = 1)`

_(Number?, Number?) -> Generator Number_

Creates a generator which produces numbers indefinitely starting at `start` in increments of `step`.

_Example:_

```js
genInfinite(5, 2);    // generator for 5, 7, 9, 11, 13, ...
```


#### <a href='genTimes'></a>`genTimes(count, start = 0, step = 1)`

_(Number, Number?, Number?) -> Generator Number_

Creates a generator which produces `count` numbers starting from `start` in increments of `step`.

_Example:_

```js
genTimes(6, 10, 5);   // generator for 10, 15, 20, 25, 30, 35
```


#### <a href='genTransform'></a>`genTransform(update, start)`

___Curried___

_(a -> a) -> a -> Generator a_

Creates a generator which produces the results of repeatedly applying `update` to successive values starting from `start`.

By default, the created generator will produce an infinite series of values, but it is possible to terminate the series by returning `genStop` from `update`.

_Example:_
```js
genTransform(x => x + 'a', '');   // generator for '', 'a', 'aa', 'aaa', ...

genTransform(x => x > 128 ? genStop : x * 2, 1);  // generator for 1, 2, 4, 8, 16, 32, 64, 128
```
