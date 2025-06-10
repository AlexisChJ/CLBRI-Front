"use client"

import { Loader } from "@googlemaps/js-api-loader"
import { useEffect, useRef } from "react"

type Location = { lat: number; lng: number; title?: string }

type Props = {
  adminLocation: Location
  userLocations: Location[]
}

const adminSvg = `
<svg xmlns="http://www.w3.org/2000/svg" fill="#3b82f6" viewBox="0 0 24 24" stroke="none" width="24" height="24">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
</svg>`.trim()

const userSvg = `
<svg xmlns="http://www.w3.org/2000/svg" fill="#ef4444" viewBox="0 0 24 24" stroke="none" width="24" height="24">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
</svg>`.trim()

const toDataUrl = (svg: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`

const LocationsMap: React.FC<Props> = ({ adminLocation, userLocations }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "quarterly",
        libraries: ["places"],
      })
      await loader.load()
      const { Map } = await loader.importLibrary("maps")

      const map = new Map(mapRef.current as HTMLElement, {
        center: adminLocation,
        zoom: 12,
      })

      new google.maps.Marker({
        position: adminLocation,
        map,
        title: adminLocation.title ?? "Admin",
        icon: {
          url: toDataUrl(adminSvg),
          size: new google.maps.Size(48, 48),
          scaledSize: new google.maps.Size(48, 48),
          anchor: new google.maps.Point(24, 24),
        },
      })

      userLocations.forEach((loc) => {
        new google.maps.Marker({
          position: loc,
          map,
          title: loc.title,
          icon: {
            url: toDataUrl(userSvg),
            size: new google.maps.Size(48, 48),
            scaledSize: new google.maps.Size(48, 48),
            anchor: new google.maps.Point(24, 24),
          },
        })
      })
    }

    initMap()
  }, [adminLocation, userLocations])

  return <div ref={mapRef} className="w-full h-full overflow-hidden rounded-lg border shadow-md" />

}

export default LocationsMap