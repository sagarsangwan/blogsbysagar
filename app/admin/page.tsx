import { db } from '@/drizzle/src/db'
import { newsletter } from '@/drizzle/src/db/schema'
import React from 'react'

async function Page() {
  const allEmails = await db.select().from(newsletter)
  
  return (
    <div>
    hii
    </div>
  )
}

export default Page
