import { getDb } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    await getDb().execute(`
      CREATE TABLE IF NOT EXISTS albums (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        artist TEXT NOT NULL,
        album TEXT NOT NULL,
        price REAL NOT NULL,
        genre TEXT NOT NULL,
        condition TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await getDb().execute({
      sql: `INSERT INTO albums (artist, album, price, genre, condition) VALUES (?, ?, ?, ?, ?)`,
      args: ['Pink Floyd', 'Dark Side of the Moon', 850, 'Rock Progresivo', 'VG+']
    })

    return NextResponse.json({ success: true, message: 'Album added successfully' })
  } catch (error) {
    console.error('Error seeding album:', error)
    return NextResponse.json({ error: 'Failed to seed album' }, { status: 500 })
  }
}
