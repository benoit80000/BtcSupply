// app/api/btc/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // pas de cache côté Next

export async function GET() {
  try {
    const res = await fetch("https://api.blockchair.com/bitcoin/stats", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Erreur API Blockchair");
    }

    const json = await res.json();

    // circulation en satoshis
    const sats = json.data.circulation as number;
    const btc = sats / 100_000_000;

    return NextResponse.json({
      btcMined: btc,
      satsMined: sats,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Impossible de récupérer les données BTC" },
      { status: 500 }
    );
  }
}
