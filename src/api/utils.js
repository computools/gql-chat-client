import { apiClient } from '.';
import omitDeep from 'omit-deep';

export const baseMutation = (mutation, defaultOptions = {}) => async ({
  omitTypename = true,
  ...options
} = {}) => {
  const res = await apiClient.mutate({ mutation, ...defaultOptions, ...options });
  omitTypename && omitDeep(res, '__typename');
  return res;
};

export const baseQuery = (query, defaultOptions = {}) => async ({
  omitTypename = true,
  ...options
} = {}) => {
  const res = await apiClient.query({ query, ...defaultOptions, ...options });
  omitTypename && omitDeep(res, '__typename');
  return res;
};

export const baseNoCacheQuery = query =>
  baseQuery(query, { fetchPolicy: 'network-only' });
