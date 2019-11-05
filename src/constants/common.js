import { Time } from '../models';

export const API_URL = 'http://localhost:5000/graphql';

export const TOKEN_UPDATE_DELAY = Time.minutes(50);
export const TOKEN_UPDATE_MINIMUM_TIME = TOKEN_UPDATE_DELAY + Time.minutes(5);
