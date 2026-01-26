import { db } from '@/drizzle/src/db';
import { newsletter } from '@/drizzle/src/db/schema';
import { checkRateLimit } from '@/lib/redis';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const rateLimitKey = `ratelimit:newsletter:${ip}`;
    const { allowed, remaining } = await checkRateLimit(rateLimitKey, 5, 60);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429, 
          headers: { 'X-RateLimit-Remaining': remaining.toString() } 
        }
      );
    }
    const body = await request.json()

    const email = body?.email?.toLowerCase().trim();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
   
    const existing = (await db.select().from(newsletter).where(eq(newsletter.email, email)).limit(1))
    console.log(existing)
    if (existing.length>0){
        return NextResponse.json(
            {error:"Already Subscribed"},
            {status:409}
    )
    }
    
    await db.insert(newsletter).values({email:email})
    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
   
    
  } catch (error) {
    // if (error instanceof Prisma.PrismaClientKnownRequestError){
    //     if (error.code === "P2002") {
    //     return NextResponse.json(
    //       { error: "Email already exists" },
    //       { status: 409 }
    //     );
    //   }
    // }
    console.log(error)
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    )}
}

export async function get() {
  const allEmails = await db.select().from(newsletter)
  return Response.json({
    allEmails
  })
  
}