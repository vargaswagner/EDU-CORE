import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  APP_NAME: z.string().min(1).default("instituto-backend"),

  APP_VERSION: z.string().min(1).default("1.0.0"),

  APP_HOST: z.string().default("0.0.0.0"),

  APP_PORT: z.coerce.number().int().min(1).max(65535).default(4000),

  API_PREFIX: z.string().default("/api"),

  API_VERSION: z.string().default("v1"),

  CORS_ORIGIN: z.string().default("http://localhost:3000"),

  BODY_LIMIT: z.string().default("2mb"),

  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),

  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),

  TRUST_PROXY: z
    .string()
    .transform((value) => value === "true")
    .default("false"),

  // DATABASE

  DB_DIALECT: z.enum(["postgres"]).default("postgres"),

  DB_HOST: z.string().default("localhost"),

  DB_PORT: z.coerce.number().int().positive().default(5432),

  DB_NAME: z.string().min(1),

  DB_USER: z.string().min(1),

  DB_PASSWORD: z.string(),

  DB_POOL_MIN: z.coerce.number().int().nonnegative().default(2),

  DB_POOL_MAX: z.coerce.number().int().positive().default(10),

  DB_CONNECTION_TIMEOUT: z.coerce.number().int().positive().default(10000),

  DB_LOGGING: z
    .string()
    .transform((value) => value === "true")
    .default("false"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("Invalid environment variables");

  console.error(result.error.flatten().fieldErrors);

  process.exit(1);
}

export const env = result.data;
