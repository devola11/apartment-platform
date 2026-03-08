// src/components/maps/ListingsMap.jsx
// ------------------------------------------------------------------
// React-Leaflet wraps the Leaflet.js mapping library in React components.
// MapContainer is the root map element. TileLayer fetches map tiles from
// OpenStreetMap (free, no API key needed). Marker + Popup place pins.
// ------------------------------------------------------------------
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";

// Fix for Leaflet's default marker icon path breaking in Webpack/Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Default center falls between California and Florida
const DEFAULT_CENTER = [36.5, -100];
const DEFAULT_ZOOM = 4;

export default function ListingsMap({ listings = [], className = "h-[420px]" }) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow ${className}`}>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        // scrollWheelZoom disabled by default so the page scrolls normally
        scrollWheelZoom={false}
      >
        {/* OpenStreetMap tile layer — free, no key required */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* One marker per listing that has coordinates */}
        {listings
          .filter((l) => l.latitude && l.longitude)
          .map((l) => (
            <Marker key={l.id} position={[l.latitude, l.longitude]}>
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{l.title}</p>
                  <p className="text-gray-500">{l.city}, {l.state}</p>
                  <p className="text-brand-600 font-bold">${l.price?.toLocaleString()}/mo</p>
                  <Link
                    to={`/listings/${l.id}`}
                    className="text-brand-600 underline text-xs"
                  >
                    View details →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
