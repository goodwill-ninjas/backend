import * as joi from 'joi';

const defaults = {
  POSTGRES: 'postgres',
  PORTS: {
    POSTGRES: 5432,
    API: 3000,
  },
  JWT_EXPIRE: '1w',
};

export const configValidationSchema = joi.object({
  POSTGRES_USER: joi.string().default(defaults.POSTGRES).required(),
  POSTGRES_PASSWORD: joi.string().default(defaults.POSTGRES).required(),
  POSTGRES_HOST: joi.string().default(defaults.POSTGRES).required(),
  POSTGRES_PORT: joi.number().default(defaults.PORTS.POSTGRES).required(),
  POSTGRES_DB: joi.string().required(),
  NEST_PORT: joi.number().default(defaults.PORTS.API).required(),
  JWT_SECRET: joi.string().required(),
  JWT_EXPIRE: joi.string().default(defaults.JWT_EXPIRE).required(),
});
