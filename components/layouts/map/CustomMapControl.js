import { ControlPosition, MapControl } from '@vis.gl/react-google-maps'
import AutoComplete from '@/components/layouts/map/AutoComplete'

const CustomMapControl = ({ setSelectedPlace, setZoom }) => {
  return (
    <>
      <MapControl position={ControlPosition.TOP}>
        <AutoComplete
          setSelectedPlace={setSelectedPlace}
          // setMarkersData={setMarkersData}
        />
      </MapControl>
      <MapControl position={ControlPosition.BOTTOM}>
        <div className="w-dvw flex justify-end">
          <div>
            <button
              className="block h-8 w-8 mx-2 my-2 text-xl bg-white border"
              onClick={() => setZoom(prev => (prev < 19 ? prev + 1 : 20))}>
              ＋
            </button>
            <button
              className="block h-8 w-8 mx-2 mb-6 text-xl bg-white border"
              onClick={() => setZoom(prev => (prev > 2 ? prev - 1 : 1))}>
              ー
            </button>
          </div>
        </div>
      </MapControl>
    </>
  )
}

export default CustomMapControl
