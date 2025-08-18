import { Request } from "express";

type Query = {
  page?: number
  limit?: number
  [key: string]: any;
}
export const Query = <T>(query: Request<unknown>['query'] & Query & Partial<T>) => {
  const params = { ...query } as Query;

  if (query.page) {
    query.page = Number(query.page);
  }
  if (query.limit) {
    query.limit = Number(query.limit);
  }

  Object.keys(params).forEach(key => {
    const val = params[key];

    if (!val) {
      delete params[key];
      return;
    }

    if (val.includes(',')) {
      params[key] = val.split(',').map(v => +v)
      return
    }

    if (Number.isNaN(Number(val))) {
      params[key] = val
    } else {
      params[key] = Number(val);
    }
  })

  return params as Query & { page: number; limit: number } & Partial<T>;
}

export const QueryPagination = <T>(query: T & { page?: number; limit?: number }) => {
  const { page = 1, limit = 10, ...params } = query;

  Object.keys(params).forEach(key => {
    const val = params[key];

    if (!val) {
      delete params[key];
      return;
    }

    if (val.includes(',')) {
      params[key] = val.split(',').map(v => +v)
      return
    }

    if (Number.isNaN(Number(val))) {
      params[key] = val
    } else {
      params[key] = Number(val);
    }
  })

  return { ...params, page, limit }
}