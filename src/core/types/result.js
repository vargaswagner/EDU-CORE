export class Result {
  constructor({ success, data = null, error = null }) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  static ok(data = null) {
    return new Result({
      success: true,
      data,
    });
  }

  static fail(error) {
    return new Result({
      success: false,
      error,
    });
  }
}
