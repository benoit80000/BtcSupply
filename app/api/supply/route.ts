import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://blockchain.info/q/totalbc", {
      next: { revalidate: 30 }, // Cache 30 secondes
    });

    if (!response.ok) {
      throw new Error("Erreur API Blockchain.info");
    }

    const data = await response.text();
    const supply = parseInt(data) / 100000000; // Conversion satoshis -> BTC

    return NextResponse.json({
      supply,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les données Bitcoin" },
      { status: 500 }
    );
  }
}
