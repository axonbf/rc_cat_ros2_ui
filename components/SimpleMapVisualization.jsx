//  https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/

import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../app/_components/SimpleMap.css'

const INITIAL_CENTER = [
  -75.0242,
  40.6941
]
const INITIAL_ZOOM = 10.12

function SimpleMap(props) {
  const { gpsPosition } = props;
  const mapRef = useRef()
  const mapContainerRef = useRef()
  const markerRef = useRef(null)

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom]     = useState(INITIAL_ZOOM)

  // Initialize marker state
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXhvbmJmIiwiYSI6ImNtNmt1anR2MzAyOHIybHF5dTE5cWhpZnoifQ.PIfY7bkO4_KnT0tEU1_riQ'
    
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: center, //[gpsPosition?.longitude ?? -74.0242, gpsPosition?.latitude ?? 40.6941],
      zoom: zoom //10.12,
    })

    mapRef.current.on('move', () => {
      // get the current center coordintaes and zoom level from the map
      const mapCenter = mapRef.current.getCenter()
      const mapZoom   = mapRef.current.getZoom()

      // update state
      setCenter([ mapCenter.lng, mapCenter.lat])
      setZoom(mapZoom)
    })

    // Add a marker at the initial position
    markerRef.current = new mapboxgl.Marker()
      .setLngLat([gpsPosition?.longitude ?? -74.0242, gpsPosition?.latitude ?? 40.6941])
      .addTo(mapRef.current)
    
    return () => {
      mapRef.current.remove()
    }
  }, [])

  // Update the marker position when gpsPosition changes
  useEffect(() => {
    if (markerRef.current && gpsPosition) {
      markerRef.current.setLngLat([gpsPosition?.longitude, gpsPosition?.latitude])
    }
  }, [gpsPosition])  // This ensures that when gpsPosition changes, the marker updates

  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: [gpsPosition?.longitude ?? -74.0242, gpsPosition?.latitude ?? 40.6941],//[markerRef.current.getCenter().lng, markerRef.current.getCenter().lat], //INITIAL_CENTER,
      zoom: 18 //INITIAL_ZOOM*2
    })
  }

  return (
    <>
      <div id='map-container' ref={mapContainerRef} >
        <div className="sidebar">
          Longitued: {center [0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
        </div>
        <button className='reset-button' onClick={handleButtonClick}>
          Go to Cat
        </button>
      </div>
      
    </>
  )
}

export default SimpleMap;
