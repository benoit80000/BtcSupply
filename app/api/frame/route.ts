import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Récupérer les données Bitcoin
    const response = await fetch("https://blockchain.info/q/totalbc");
    const data = await response.text();
    const supply = (parseInt(data) / 100000000).toLocaleString("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin;

    // Retourner une nouvelle frame avec les données actualisées
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${baseUrl}/api/og?supply=${supply}" />
          <meta property="fc:frame:image:aspect_ratio" content="1:1" />
          <meta property="fc:frame:button:1" content="🔄 Actualiser" />
          <meta property="fc:frame:button:1:action" content="post" />
          <meta property="fc:frame:post_url" content="${baseUrl}/api/frame" />
          <meta property="og:image" content="${baseUrl}/api/og?supply=${supply}" />
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
    console.error("Erreur Frame:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Utilisez POST pour interagir avec le Frame" });
}
