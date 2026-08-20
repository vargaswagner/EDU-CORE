// src/shared/utils/currency.util.js

const DEFAULT_CURRENCY = 'PEN';

export function normalizeAmount(amount) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    throw new Error('Monto inválido.');
  }

  return Math.round(value * 100) / 100;
}

export function toMinorUnits(amount) {
  return Math.round(normalizeAmount(amount) * 100);
}

export function fromMinorUnits(amount) {
  if (!Number.isInteger(amount)) {
    throw new Error('Las unidades menores deben ser enteras.');
  }

  return amount / 100;
}

export function formatCurrency(
  amount,
  currency = DEFAULT_CURRENCY,
  locale = 'es-PE',
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export function roundAmount(amount) {
  return Math.round(Number(amount) * 100) / 100;
}
