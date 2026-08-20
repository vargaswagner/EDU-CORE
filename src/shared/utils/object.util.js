// src/shared/utils/object.util.js

export function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function removeUndefined(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined),
  );
}

export function removeNullish(object) {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );
}

export function pick(object, keys) {
  return Object.fromEntries(
    keys
      .filter((key) => Object.prototype.hasOwnProperty.call(object, key))
      .map((key) => [key, object[key]]),
  );
}

export function omit(object, keys) {
  const excluded = new Set(keys);

  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !excluded.has(key)),
  );
}
