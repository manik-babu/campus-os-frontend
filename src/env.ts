import { createEnv } from '@t3-oss/env-nextjs'
import * as z from 'zod'

export const env = createEnv({
    server: {
        BACKEND_URL: z.url(),
        FRONTEND_URL: z.url(),
        JWT_SECRET: z.string(),
        NODE_ENV: z.enum(["development", "production", "test"]),
    },
    client: {
        NEXT_PUBLIC_BACKEND_URL: z.url(),
        NEXT_PUBLIC_FRONTEND_URL: z.url(),
    },
    runtimeEnv: {
        BACKEND_URL: process.env.BACKEND_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        NODE_ENV: process.env.NODE_ENV,
    }
});