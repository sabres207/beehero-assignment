// @ts-nocheck

import { FC, memo } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { icon } from 'leaflet'

interface Props {
  lat: number
  lng: number
}

const MARKER_ICON = icon({
  iconUrl: '/favicon.ico',
  iconSize: [16, 16],
})

export const Map: FC<Props> = memo(({ lat, lng }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={6} className="z-10">
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={MARKER_ICON} />
    </MapContainer>
  )
})
