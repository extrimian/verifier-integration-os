import { ValueProvider } from '@nestjs/common';

export const config = {
  PORT: process.env.PORT || 3000,
  SSI_API_URL: process.env.SSI_API_URL,
  MONGO_URL: process.env.MONGO_URL
};

export const CONFIG = Symbol.for('CONFIG');
export type Configuration = typeof config;
export const ConfigProvider: ValueProvider<Configuration> = {
  provide: CONFIG,
  useValue: config,
};

