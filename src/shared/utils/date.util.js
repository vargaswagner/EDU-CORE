// src/shared/utils/date.util.js

export function now() {
  return new Date();
}

export function isValidDate(value) {
  const date = value instanceof Date ? value : new Date(value);

  return !Number.isNaN(date.getTime());
}

export function toDate(value) {
  if (value instanceof Date) {
    return value;
  }

  const date = new Date(value);

  if (!isValidDate(date)) {
    throw new Error('Fecha inválida.');
  }

  return date;
}

export function startOfDay(value) {
  const date = toDate(value);

  date.setHours(0, 0, 0, 0);

  return date;
}

export function endOfDay(value) {
  const date = toDate(value);

  date.setHours(23, 59, 59, 999);

  return date;
}

export function addDays(value, days) {
  const date = toDate(value);

  date.setDate(date.getDate() + Number(days));

  return date;
}

export function addMonths(value, months) {
  const date = toDate(value);

  date.setMonth(date.getMonth() + Number(months));

  return date;
}

export function isBefore(dateA, dateB) {
  return toDate(dateA).getTime() < toDate(dateB).getTime();
}

export function isAfter(dateA, dateB) {
  return toDate(dateA).getTime() > toDate(dateB).getTime();
}

export function isBetween(value, start, end) {
  const current = toDate(value).getTime();

  return current >= toDate(start).getTime() && current <= toDate(end).getTime();
}
