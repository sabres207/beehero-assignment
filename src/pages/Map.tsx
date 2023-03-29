import { useEffect, memo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Map as MapComponent } from '../components/Map'

type MapParams = Record<string, string | undefined>
const LOCATION_REGEX = /^@(-?\d+\.?\d*),(-?\d+\.?\d*)$/

export const Map = memo(() => {
  const navigate = useNavigate()
  const { location } = useParams<MapParams>()

  useEffect(() => {
    if (!validateParams(location)) {
      navigate('/')
    }
  }, [location, navigate])

  if (!validateParams(location)) {
    return null
  }

  const [lat, lng] = extractLatLng(location!)

  return <MapComponent lat={lat} lng={lng} />
})

function validateParams(location?: string): boolean {
  return !!location && LOCATION_REGEX.test(location)
}

function extractLatLng(location: string): number[] {
  const [, ...latLng] = location.match(LOCATION_REGEX) as string[]
  return latLng.map(parseFloat)
}
