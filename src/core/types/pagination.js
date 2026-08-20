export class Pagination {
  constructor({ page = 1, limit = 20, total = 0 } = {}) {
    this.page = Math.max(1, Number(page));

    this.limit = Math.min(100, Math.max(1, Number(limit)));

    this.total = Math.max(0, Number(total));
  }

  get offset() {
    return (this.page - 1) * this.limit;
  }

  get totalPages() {
    return Math.ceil(this.total / this.limit);
  }

  get hasNextPage() {
    return this.page < this.totalPages;
  }

  get hasPreviousPage() {
    return this.page > 1;
  }
}
