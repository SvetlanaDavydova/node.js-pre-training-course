/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
  if (!source) {
    throw new TypeError('Source not found.');
  }

  const result = [];

  for (let [index, value] of source.entries()) {
    result[result.length] = mapper(value, index);
  }

  return result;
}

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
  if (!source) {
    throw new TypeError('Source not found.');
  }

  const result = [];

  for (let [index, value] of source.entries()) {
    if (predicate(value, index)) result[result.length] = value;
  }

  return result;
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
  if (!source) {
    throw new TypeError('Source not found.');
  }

  let accumulator = initial;

  for (let [index, value] of source.entries()) {
    accumulator = reducer(accumulator, value, index);
  }

  return accumulator;
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  if (!source) {
    throw new TypeError('Source not found.');
  }

  const trulyArray = [];
  const falsyArray = [];
  const resultArray: [T[], T[]] = [trulyArray, falsyArray];

  for (let item of source) {
    if (predicate(item)) {
      trulyArray[trulyArray.length] = item;
    } else {
      falsyArray[falsyArray.length] = item;
    }
  }

  return resultArray;
}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
  if (!source) {
    throw new TypeError('Source not found.');
  }

  const result: Partial <Record<K, T[]>> = {};

  for (let item of source) {
    let key = keySelector(item);
    result[key] = result[key]?.length ? [...result[key], item] : [item];
  }

  return result as Record<K, T[]>;
}
