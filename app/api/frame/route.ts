import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Fetch Bitcoin data
    const response = await fetch("https://blockchain.info/q/totalbc");
    const data = await response.text();
    const supply = (parseInt(data) / 100000000).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;

    // Return new frame with updated data
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${baseUrl}/api/og?supply=${supply}" />
          <meta property="fc:frame:image:aspect_ratio" content="1:1" />
          <meta property="fc:frame:button:1" content="🔄 Refresh" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
          <meta property="og:image" content="${baseUrl}/api/og?supply=${supply}" />
          <meta property="og:title" content="Bitcoin Supply: ${supply} BTC" />
          <meta property="og:description" content="Real-time Bitcoin supply tracking" />
        </head>
        <body></body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    console.error("Frame error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Use POST to interact with the Frame" });
}
