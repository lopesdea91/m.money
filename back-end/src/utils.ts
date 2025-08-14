import { Request } from "express";


type Query = {
  page?: number
  limit?: number
  [key: string]: any;
}

export const getQuery = <T>(query: Request<unknown>['query'] & Query & Partial<T> = {}) => {
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

    if (Number.isNaN(Number(val))) {
      params[key] = val
    } else {
      params[key] = Number(val);
    }
  })

  return params as Partial<T> & Query;
}