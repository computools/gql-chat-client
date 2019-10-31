import { apiClient } from '.';
import omitDeep from 'omit-deep';

export const baseMutation = mutation => async ({ omitTypename = true, ...rest } = {}) => {
  const res = await apiClient.mutate({ mutation, ...rest });
  omitTypename && omitDeep(res, '__typename');
  return res;
};

export const baseQuery = query => async ({ omitTypename = true, ...rest } = {}) => {
  const res = await apiClient.query({ query, ...rest });
  omitTypename && omitDeep(res, '__typename');
  return res;
};
