/* eslint-disable @next/next/no-sync-scripts */
import MapModal from '@/components/MapModal';
import Map from '../components/Map';

export const metadata = {
  title: "Runner's Map"
};

export default function MapPage() {
  return (
    <>
      <script src={process.env.TMAP_API_KEY}></script>
      <Map />
      <MapModal />
    </>
  );
}
