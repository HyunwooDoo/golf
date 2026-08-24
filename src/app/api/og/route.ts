import { createElement } from "react";
import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const origin = new URL(request.url).origin;

  return new ImageResponse(
    createElement(
      "div",
      {
        style: {
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#f8f3ea",
        },
      },
      createElement("div", {
        style: {
          position: "absolute",
          top: "-260px",
          right: "-120px",
          width: "760px",
          height: "760px",
          border: "2px solid rgba(176, 137, 68, 0.18)",
          borderRadius: "999px",
        },
      }),
      createElement("div", {
        style: {
          position: "absolute",
          top: "-170px",
          right: "-30px",
          width: "580px",
          height: "580px",
          border: "1px solid rgba(176, 137, 68, 0.28)",
          borderRadius: "999px",
        },
      }),
      createElement(
        "div",
        {
          style: {
            position: "relative",
            zIndex: 2,
            display: "flex",
            width: "58%",
            height: "100%",
            padding: "82px 0 70px 82px",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        },
        createElement("img", {
          src: `${origin}/brand/logo.png`,
          alt: "DOO YUN KON",
          width: 440,
          height: 37,
          style: {
            width: "440px",
            height: "37px",
            objectFit: "contain",
            objectPosition: "left center",
          },
        }),
        createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              color: "#21190f",
            },
          },
          createElement(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "23px",
                fontWeight: 700,
                letterSpacing: "0.18em",
              },
            },
            createElement("span", {
              style: {
                width: "56px",
                height: "3px",
                background: "#b08944",
              },
            }),
            "GOLF TEACHING PRO",
          ),
          createElement(
            "div",
            {
              style: {
                display: "flex",
                color: "#756753",
                fontSize: "21px",
                letterSpacing: "0.08em",
              },
            },
            "PRIVATE LESSON · SWING ANALYSIS",
          ),
        ),
      ),
      createElement("div", {
        style: {
          position: "absolute",
          right: "0",
          bottom: "0",
          width: "50%",
          height: "100%",
          background:
            "linear-gradient(90deg, rgba(248,243,234,0) 0%, rgba(224,206,174,0.22) 100%)",
        },
      }),
      createElement("img", {
        src: `${origin}/photos/pro-1.png`,
        alt: "두윤곤 프로",
        width: 500,
        height: 750,
        style: {
          position: "absolute",
          zIndex: 3,
          right: "38px",
          bottom: "-158px",
          width: "500px",
          height: "750px",
          objectFit: "contain",
        },
      }),
      createElement("div", {
        style: {
          position: "absolute",
          right: "0",
          bottom: "0",
          zIndex: 4,
          width: "100%",
          height: "9px",
          background: "linear-gradient(90deg, #b08944 0%, #d42b25 100%)",
        },
      }),
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
