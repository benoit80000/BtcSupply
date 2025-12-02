import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  let supply = searchParams.get("supply");

  // If no supply provided, fetch in real-time
  if (!supply) {
    try {
      const response = await fetch("https://blockchain.info/q/totalbc");
      const data = await response.text();
      supply = (parseInt(data) / 100000000).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } catch {
      supply = "19,847,523.45";
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f97316 0%, #f59e0b 50%, #eab308 100%)",
          fontFamily: "system-ui",
        }}
      >
        {/* Bitcoin Circle */}
        <div
          style={{
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "60px",
          }}
        >
          <span style={{ fontSize: "180px", color: "white" }}>₿</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "20px",
          }}
        >
          Bitcoin Supply Tracker
        </h1>

        {/* Line */}
        <div
          style={{
            width: "500px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.3)",
            marginBottom: "40px",
          }}
        />

        {/* Supply */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "10px",
          }}
        >
          {supply} BTC
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "36px",
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: "60px",
          }}
        >
          In Circulation
        </div>

        {/* LIVE Badge */}
