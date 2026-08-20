// src/shared/utils/pagination.util.js

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function normalizePagination({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
} = {}) {
  const normalizedPage = Math.max(1, Number.parseInt(page, 10) || DEFAULT_PAGE);

  const normalizedLimit = Math.min(
    MAX_LIMIT,
    Math.max(1, Number.parseInt(limit, 10) || DEFAULT_LIMIT),
  );

  return {
    page: normalizedPage,
    limit: normalizedLimit,
    offset: (normalizedPage - 1) * normalizedLimit,
  };
}

export function createPaginationMeta({ page, limit, total }) {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
