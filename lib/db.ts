import { createClient, Client } from '@libsql/client'

let db: Client | null = null

export function getDb(): Client {
  if (!db) {
    db = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN
    })
  }
  return db
}
