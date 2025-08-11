import { NextRequest, NextResponse } from 'next/server';

// Handler for the /api/pixel route (App Router)
export async function GET(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || '';
  const ipAddress =
    req.headers.get('x-forwarded-for') ||
    req.ip ||
    '';
  const { searchParams } = new URL(req.url);
  const pageURL = searchParams.get('url') || '';
  const referrer = req.headers.get('referer') || '';
  const timestamp = new Date().toISOString();
  const queryParams = Object.fromEntries(searchParams.entries());

  // Log the event data. In production, you'd store this in a database.
  console.log(`Received page view event from IP: ${ipAddress}`);
  console.log(`User Agent: ${userAgent}`);
  console.log(`Page URL: ${pageURL}`);
  console.log(`Referrer: ${referrer}`);
  console.log(`Timestamp: ${timestamp}`);
  console.log(`Query Parameters: ${JSON.stringify(queryParams)}`);

  // Raw bytes of a 1x1 transparent GIF
  const gifData = new Uint8Array([
    0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00,
    0x80, 0x00, 0x00, 0xff, 0xff, 0xff, 0x00, 0x00, 0x00, 0x2c,
    0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
    0x02, 0x44, 0x01, 0x00, 0x3b,
  ]);

  return new NextResponse(gifData, {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}