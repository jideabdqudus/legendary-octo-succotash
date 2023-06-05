import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const NEPTUNE_HOST = process.env.NEPTUNE_HOST;
export const NEPTUNE_ACCESS_KEY = process.env.NEPTUNE_ACCESS_KEY;
export const NEPTUNE_SECRET_KEY = process.env.NEPTUNE_SECRET_KEY;
export const NEPTUNE_PORT = process.env.NEPTUNE_PORT;
export const NEPTUNE_REGION = process.env.NEPTUNE_REGION;
export const DYNAMODB_ACCESS_KEY = process.env.DYNAMODB_ACCESS_KEY;
export const DYNAMODB_SECRET_KEY = process.env.DYNAMODB_SECRET_KEY;
export const DYNAMODB_REGION = process.env.DYNAMODB_REGION;
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
