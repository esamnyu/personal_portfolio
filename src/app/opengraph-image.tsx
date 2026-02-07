import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ethan Sam - AI Security Engineer & Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0b",
          position: "relative",
        }}
      >
        {/* Top gold accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundImage:
              "linear-gradient(90deg, transparent 20%, #c9a962 50%, transparent 80%)",
          }}
        />

        {/* Top-left corner accent */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            width: 30,
            height: 1,
            backgroundColor: "rgba(201, 169, 98, 0.3)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 60,
            width: 1,
            height: 30,
            backgroundColor: "rgba(201, 169, 98, 0.3)",
          }}
        />

        {/* Bottom-right corner accent */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            width: 30,
            height: 1,
            backgroundColor: "rgba(201, 169, 98, 0.3)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            width: 1,
            height: 30,
            backgroundColor: "rgba(201, 169, 98, 0.3)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#f5f2eb",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
            }}
          >
            Ethan Sam
          </div>

          {/* Gold divider */}
          <div
            style={{
              width: 60,
              height: 2,
              backgroundColor: "#c9a962",
              marginTop: 24,
              marginBottom: 24,
            }}
          />

          <div
            style={{
              fontSize: 24,
              color: "#c9a962",
              letterSpacing: "0.05em",
            }}
          >
            AI Security Engineer & Full-Stack Developer
          </div>

          <div
            style={{
              fontSize: 16,
              color: "#857f78",
              letterSpacing: "0.1em",
              marginTop: 32,
            }}
          >
            ETHANSAM.IO
          </div>
        </div>

        {/* Bottom gold accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundImage:
              "linear-gradient(90deg, transparent 20%, #c9a962 50%, transparent 80%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
