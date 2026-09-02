import { getDb } from '@/lib/db'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { artist, album, price, genre, condition } = body

    await getDb().execute({
      sql: `INSERT INTO albums (artist, album, price, genre, condition) VALUES (?, ?, ?, ?, ?)`,
      args: [artist, album, price, genre, condition]
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error inserting album:', error)
    return NextResponse.json({ error: 'Failed to insert album' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await getDb().execute('SELECT * FROM albums')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching albums:', error)
    return NextResponse.json({ error: 'Failed to fetch albums' }, { status: 500 })
  }
}
