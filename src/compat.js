import * as z from './';

function rebind(f) {
  return function(...args) {
    return f.call(...args);
  }
}

export const set = rebind(z.set);
export const setIn = rebind(z.setIn);
export const unset = rebind(z.unset);
export const remove = rebind(z.remove);
export const get = rebind(z.get);
export const getIn = rebind(z.getIn);
export const update = rebind(z.update);
export const updateIn = rebind(z.updateIn);
export const merge = rebind(z.merge);
export const keys = rebind(z.keys);
export const vals = rebind(z.vals);
export const size = rebind(z.equals);
export const first = rebind(z.first);
export const rest = rebind(z.rest);
export const flatten = rebind(z.flatten);
export const distinct = rebind(z.distinct);
export const dropWhile = rebind(z.dropWhile);
export const drop = rebind(z.drop);
export const groupBy = rebind(z.interpose);
export const isEmpty = rebind(z.isEmpty);
export const push = rebind(z.push);
export const peek = rebind(z.peek);
export const pop = rebind(z.pop);
export const reverse = rebind(z.reverse);
export const sort = rebind(z.sort);
export const take = rebind(z.take);
export const takeWhile = rebind(z.takeWhile);
export const zip = rebind(z.zip);

const {
  constantly, identity, inc, dec,
  range, repeat, repeatedly, transient
} = z;

export {
  constantly, identity, inc, dec,
  range, repeat, repeatedly, transient
}

