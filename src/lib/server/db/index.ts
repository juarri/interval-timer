import { env } from '$env/dynamic/private';

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as schema from './schema';

const client = createClient({
	url: env.TURSO_CONNECTION_URL,
	authToken: env.TURSO_AUTH_TOKEN
});

export const db = drizzle(client, { schema });
