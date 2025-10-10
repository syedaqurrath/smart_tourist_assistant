import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LOCATIONS } from '../data/locations';
import { useEffect } from 'react';

interface TajMahalMapProps {
  currentLocation: string;
  tourLocations: string[];
  onLocationClick?: (locationId: string) => void;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 17);
  }, [center, map]);

  return null;
}

export function TajMahalMap({ currentLocation, tourLocations, onLocationClick }: TajMahalMapProps) {
  const currentLocationData = LOCATIONS[currentLocation];

  const getMarkerIcon = (locationId: string): Icon => {
    const currentIndex = tourLocations.indexOf(currentLocation);
    const locationIndex = tourLocations.indexOf(locationId);

    let iconUrl = '';

    if (locationId === currentLocation) {
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
    } else if (locationIndex < currentIndex) {
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
    } else {
      iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
    }

    return new Icon({
      iconUrl,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  return (
    <MapContainer
      center={[27.1751, 78.0421]}
      zoom={17}
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={currentLocationData.coordinates} />

      {tourLocations.map((locationId, index) => {
        const location = LOCATIONS[locationId];
        return (
          <Marker
            key={locationId}
            position={location.coordinates}
            icon={getMarkerIcon(locationId)}
            eventHandlers={{
              click: () => onLocationClick?.(locationId)
            }}
          >
            <Popup>
              <div style={{ width: '250px' }}>
                <h3 style={{ color: '#8B4513', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 'bold' }}>
                  {location.name}
                </h3>
                <p style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Stop {index + 1} of {tourLocations.length}
                </p>
                <p style={{ fontSize: '0.7rem', marginBottom: '0.5rem' }}>
                  {location.description.substring(0, 120)}...
                </p>
                <hr style={{ margin: '0.5rem 0' }} />
                <p style={{ fontSize: '0.7rem', marginBottom: '0.25rem' }}>
                  <strong>Next:</strong> {location.nextDirections.substring(0, 80)}...
                </p>
                <p style={{ fontSize: '0.7rem' }}>
                  <strong>Walking time:</strong> {location.walkingTime}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
