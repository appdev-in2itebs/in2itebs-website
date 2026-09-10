import { ImageResponse } from "next/og";
export const alt = "In2IT EBS: enterprise transformation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "#f5f8fc",
          color: "#17253e",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 38, fontWeight: 700 }}>In2IT EBS</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.08,
            maxWidth: 950,
          }}
        >
          <div>Enterprise transformation.</div>
          <div>One accountable partner.</div>
        </div>
        <div style={{ fontSize: 24, color: "#285d85" }}>Platforms · Advisory · Digital engineering</div>
      </div>
    ),
    size,
  );
}
