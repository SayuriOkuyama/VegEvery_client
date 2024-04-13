import React, { useEffect, useState } from 'react'
import {
  useMapsLibrary,
  useMap,
  useApiIsLoaded,
  AdvancedMarker,
} from '@vis.gl/react-google-maps'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const Window = ({ clickedPlace, setClickedPlace }) => {
  const map = useMap()
  const placesLib = useMapsLibrary('places')
  const [placesService, setPlacesService] = useState(null)
  const [show, setShow] = useState(false)
  const [selectedCarousel, setSelectedCarousel] = useState(null)
  const [data, setData] = useState(null)
  const apiIsLoaded = useApiIsLoaded()
  console.log(`map: ${map}`)

  useEffect(() => {
    if (!placesLib || !map) return

    console.log('effect')
    setPlacesService(new placesLib.PlacesService(map))
  }, [placesLib, map])

  useEffect(() => {
    console.log(`placeLib: ${placesLib}`)
    console.log(`map: ${map}`)
    console.log(`apiIsLoaded: ${apiIsLoaded}`)
    console.log(`placesService: ${placesService}`)
    if (!placesService || !clickedPlace || !apiIsLoaded) return

    if (clickedPlace) {
      console.log('near')
      const request = {
        location: clickedPlace,
        radius: 50,
        // includedTypes: ['food', 'restaurant', 'cafe', 'store'],
        // excludedTypes: ['route'],
        type: 'restaurant',
        keyword: '飲食店 カフェ レストラン',
        maxResultCount: 1,
        languageCode: 'ja',
      }

      placesService.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // for (let i = 0; i < results.length; i++) {
          console.log(results)
          setShow(true)
          setData(results)
          const carousel = document.getElementById('carousel')
          carousel.innerHTML = '' // Clear the carousel
          results.forEach(place => {
            const item = document.createElement('div')
            item.textContent = place.name
            carousel.appendChild(item)
          })
        }
      })
    }
  }, [placesService, clickedPlace])

  const handleSelectCarousel = place => {
    setSelectedCarousel(place)
  }

  useEffect(() => {
    if (!selectedCarousel) return
    map.fitBounds(selectedCarousel.geometry?.viewport)
  }, [selectedCarousel])

  // const closeWindow = () => {
  //   setClickedPlace(false)
  // }
  // console.log(selectedCarousel)
  // console.log(selectedCarousel.geometry.location)
  return (
    <>
      {show && (
        <>
          {selectedCarousel && (
            <AdvancedMarker position={selectedCarousel.geometry.location} />
          )}
          <Carousel className=" w-2/3 max-w-sm  inset-x-0 mx-auto fixed bottom-20 lex justify-center">
            <CarouselContent className="-ml-1">
              {data.map((place, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 "
                  onClick={() => handleSelectCarousel(place)}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-2xl font-semibold">
                          {place.name}
                        </span>
                        <button onClick={() => setShow(false)}>close</button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}
    </>
  )
}

export default Window
