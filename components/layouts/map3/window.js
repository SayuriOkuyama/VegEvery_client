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
import Link from 'next/link'

const Window = ({ clickedPlace }) => {
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
                <CarouselItem key={index} className="pl-1 ">
                  <div className="p-1">
                    <Card>
                      <CardContent className="aspect-square relative p-6">
                        <button
                          onClick={() => setShow(false)}
                          className="leading-none absolute border top-1 right-1 text-sm p-1">
                          ✕
                        </button>
                        {place.photos[0] && (
                          <div className="w-full h-32 overflow-hidden flex items-center">
                            <img
                              src={place.photos[0].getUrl()}
                              alt="レシピ画像1"
                              className="object-contain m-auto block"
                            />
                          </div>
                          // <img src={place.photos[0].getUrl()} className=''/>
                        )}
                        <div className="font-semibold text-center my-1">
                          {place.name}
                        </div>
                        <div className="flex justify-between">
                          <div>vageTag</div>
                          <button
                            onClick={() => handleSelectCarousel(place)}
                            className="block border">
                            ここに移動
                          </button>
                        </div>
                        <div>
                          ベジクチコミはありません
                          <Link
                            href={`/map/review/${place.place_id}/create?name=${place.name}&lat=${place.geometry.location.lat()}&lng=${place.geometry.location.lng()}`}>
                            <button className="border">
                              最初のクチコミを投稿
                            </button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="carousel-color" />
            <CarouselNext className="carousel-color" />
          </Carousel>
        </>
      )}
    </>
  )
}

export default Window
