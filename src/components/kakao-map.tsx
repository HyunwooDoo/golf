"use client";

import { useCallback, useRef, useState } from "react";
import Script from "next/script";
import { AlertCircle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

type KakaoPosition = object;

type KakaoMapInstance = {
  relayout: () => void;
};

type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => KakaoPosition;
  Map: new (
    container: HTMLElement,
    options: { center: KakaoPosition; level: number },
  ) => KakaoMapInstance;
  Marker: new (options: {
    map: KakaoMapInstance;
    position: KakaoPosition;
  }) => object;
};

declare global {
  interface Window {
    kakao?: { maps: KakaoMaps };
  }
}

const javascriptKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

const fallbackLocation = {
  latitude: 37.6635123,
  longitude: 127.0476229,
};

type KakaoMapProps = {
  className?: string;
  placeName: string;
  address: string;
};

export function KakaoMap({ className, placeName, address }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<KakaoMapInstance | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const initializeMap = useCallback(() => {
    const container = containerRef.current;
    const maps = window.kakao?.maps;

    if (!container || !maps) {
      setStatus("error");
      return;
    }

    if (mapRef.current) {
      mapRef.current.relayout();
      return;
    }

    maps.load(() => {
      const fallback = new maps.LatLng(
        fallbackLocation.latitude,
        fallbackLocation.longitude,
      );
      const map = new maps.Map(container, {
        center: fallback,
        level: 3,
      });
      new maps.Marker({ map, position: fallback });

      mapRef.current = map;
      setStatus("ready");
    });
  }, []);

  if (!javascriptKey) {
    return (
      <div
        className={cn("kakao-map kakao-map-fallback", className)}
        role="img"
        aria-label={`${placeName} 지도 설정 필요`}
      >
        <AlertCircle aria-hidden="true" />
        <span>카카오맵 키 설정이 필요합니다</span>
        <small>LOCATION MAP</small>
      </div>
    );
  }

  return (
    <div
      className={cn("kakao-map", className)}
      role="region"
      aria-label={`${placeName} 위치 지도: ${address}`}
    >
      <Script
        id="kakao-maps-sdk"
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${javascriptKey}&autoload=false`}
        strategy="afterInteractive"
        onReady={initializeMap}
        onError={() => setStatus("error")}
      />
      <div ref={containerRef} className="kakao-map-canvas" />
      <span className="kakao-map-label">
        <MapPin aria-hidden="true" />
        {placeName}
      </span>
      {status !== "ready" ? (
        <span className="kakao-map-status" role="status">
          {status === "error"
            ? "지도를 불러오지 못했습니다"
            : "지도 불러오는 중"}
        </span>
      ) : null}
    </div>
  );
}
