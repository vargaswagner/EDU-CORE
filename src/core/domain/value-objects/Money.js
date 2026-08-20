export class Money {
  #amount;
  #currency;

  constructor(amount, currency = 'PEN') {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
      throw new Error('Monto inválido');
    }

    if (numericAmount < 0) {
      throw new Error('El monto no puede ser negativo');
    }

    if (!/^[A-Z]{3}$/.test(currency)) {
      throw new Error('Moneda inválida');
    }

    this.#amount = Math.round(numericAmount * 100);

    this.#currency = currency;
  }

  get amount() {
    return this.#amount / 100;
  }

  get cents() {
    return this.#amount;
  }

  get currency() {
    return this.#currency;
  }

  add(other) {
    this.#assertSameCurrency(other);

    return Money.fromCents(this.#amount + other.cents, this.#currency);
  }

  subtract(other) {
    this.#assertSameCurrency(other);

    const result = this.#amount - other.cents;

    if (result < 0) {
      throw new Error('El resultado no puede ser negativo');
    }

    return Money.fromCents(result, this.#currency);
  }

  equals(other) {
    return (
      other instanceof Money &&
      this.#amount === other.cents &&
      this.#currency === other.currency
    );
  }

  static fromCents(cents, currency = 'PEN') {
    const money = Object.create(Money.prototype);

    money.#amount = cents;
    money.#currency = currency;

    return money;
  }

  #assertSameCurrency(other) {
    if (!(other instanceof Money)) {
      throw new Error('Objeto Money inválido');
    }

    if (this.#currency !== other.currency) {
      throw new Error('No se pueden operar monedas diferentes');
    }
  }

  toJSON() {
    return {
      amount: this.amount,
      currency: this.currency,
    };
  }
}
