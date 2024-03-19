import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/db/schema.ts',
	out: './src/lib/server/db/migrations',
	driver: 'turso',
	dbCredentials: {
		url: process.env.TURSO_CONNECTION_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!
	}
} satisfies Config;
