/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

interface ProtestMapProps {
  location?: string | undefined;
}

declare global {
  interface Window {
    kakao: any;
  }
}

type Marker = {
  position: {
    lat: number;
    lng: number;
  };
};

export default function ProtestMap({ location }: ProtestMapProps) {
  const [scriptLoad, setScriptLoad] = useState<boolean>(false);
  const [marker, setMarker] = useState<Marker>({
    position: {
      lat: 33.450701,
      lng: 126.570667,
    },
  });
  const [locationName, setLocationName] = useState<string>();
  
  const handleLoadScript = useCallback(() => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const ps = new window.kakao.maps.services.Places();

      ps.keywordSearch(location, (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          setLocationName(data[0]?.place_name);
        }
      });

      geocoder.addressSearch(location, function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          const coords = new window.kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x)
          );

          const locationMarker = {
            position: {
              lat: coords.getLat(),
              lng: coords.getLng(),
            },
          };
          bounds.extend(coords);
          setMarker(locationMarker);
          setScriptLoad(true);
        }
      });
    });
  }, [location]);

  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.defer = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services,clusterer&autoload=false`;
    document.body.appendChild(script);

    script.addEventListener("load", handleLoadScript);
  }, [location, handleLoadScript]);

  return (
    <div>
      {scriptLoad && (
        <Map
          id="map"
          center={marker?.position}
          className="h-60 w-full rounded-lg lg:h-96 border-2"
          level={3}
        >
          <MapMarker
            position={marker.position}
          />
          <CustomOverlayMap
            position={marker.position}
            yAnchor={2.2}
            xAnchor={1}
          >
            <div className="customoverlay truncate rounded-full bg-brand/70 p-2 text-xs text-white">
              <Link
                href={`https://map.kakao.com/link/map/${locationName},${marker.position.lat},${marker.position.lng}`}
                target="_blank"
                rel="noreferrer"
              >
                <span>{locationName}</span>
              </Link>
            </div>
          </CustomOverlayMap>
        </Map>
      )}
    </div>
  );
}
