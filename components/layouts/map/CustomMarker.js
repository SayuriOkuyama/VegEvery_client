import React, { useCallback, useContext, useState } from 'react'
import { AdvancedMarker } from '@vis.gl/react-google-maps'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  // DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { MarkersDataContext } from '@/contexts/markerProvider'
import { SelectedMarkerContext } from '@/contexts/selectedMarkerProvider'

const CustomMarker = () => {
  const [state, setState] = useState({
    open: {},
    selectedMarker: null,
  })
  const [open, setOpen] = useState(false)
  const [markersData] = useContext(MarkersDataContext)
  const [selectedMarker, setSelectedMarker] = useContext(SelectedMarkerContext)

  const handleMarkerClick = useCallback(
    markerData => {
      console.log('handleMarkerClick!!')
      console.log('Before setOpen:', open)
      setState(prevState => {
        const newOpen = {
          ...prevState.open,
          [markerData.place_id]: true,
        }
        const newSelectedMarker = newOpen[markerData.place_id]
          ? markerData
          : prevState.selectedMarker
        console.log('After setState:', {
          open: newOpen,
          selectedMarker: newSelectedMarker,
        })
        return { open: newOpen, selectedMarker: newSelectedMarker }
      })
    },
    [state],
  )
  // console.log(selectedMarker)
  // console.log(open)
  const handleClose = useCallback(place_id => {
    setState(prevState => ({
      ...prevState,
      open: { ...prevState.open, [place_id]: false },
    }))
  }, [])

  return (
    <>
      {markersData &&
        markersData.map(markerData => (
          <React.Fragment key={markerData.place_id}>
            <Drawer
              open={state.open[markerData.place_id] || false}
              onOpenChange={() => handleClose(markerData.place_id)}>
              <DrawerContent className="pb-20">
                <DrawerHeader>
                  <DrawerTitle>
                    {state.selectedMarker && state.selectedMarker.name}
                  </DrawerTitle>
                  <DrawerDescription>
                    This action cannot be undone.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose />
                  <Button variant="outline">Cancel</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <AdvancedMarker
              position={markerData.geometry.location}
              label={markerData.name?.substr(0, 1)}
              onClick={() => {
                console.log('Marker clicked:', markerData.place_id)
                handleMarkerClick(markerData)
              }}
            />
          </React.Fragment>
        ))}
    </>
  )
}

export default CustomMarker
