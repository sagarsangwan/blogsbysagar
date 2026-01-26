import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// import { checkRateLimit } from '@/lib/redis'
// import { Prisma } from '@/lib/generated/prisma/client';

export async function POST(request: NextRequest) {
  try {
    // const ip = request.headers.get('x-forwarded-for') || 
    //            request.headers.get('x-real-ip') || 
    //            'unknown';
    // const rateLimitKey = `ratelimit:newsletter:${ip}`;
    // const { allowed, remaining } = await checkRateLimit(rateLimitKey, 5, 60);

    // if (!allowed) {
    //   return NextResponse.json(
    //     { error: 'Too many requests. Please try again later.' },
    //     { 
    //       status: 429, 
    //       headers: { 'X-RateLimit-Remaining': remaining.toString() } 
    //     }
    //   );
    // }
    const body = await request.json()

    const email = body?.email?.toLowerCase().trim();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
   
    const existing = await prisma.newsletter.findUnique({where:{email}})
    if (existing){
        return NextResponse.json(
            {error:"Already Subscribed"},
            {status:409}
    )
    }
    
    await prisma.newsletter.create(email)
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

