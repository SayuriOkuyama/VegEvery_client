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
import axios from '@/lib/axios'
import VegeTag from '../VegeTag'
import { Button } from '@/components/ui/button'
import { FaMapMarkerAlt } from 'react-icons/fa'

const CreateCarousel = ({ clickedPlace }) => {
  const map = useMap()
  const placesLib = useMapsLibrary('places')
  const [placesService, setPlacesService] = useState(null)
  const [show, setShow] = useState(false)
  const [selectedCarousel, setSelectedCarousel] = useState(null)
  const [placesData, setPlacesData] = useState([])
  const [restaurantsData, setRestaurantsData] = useState(null)
  const apiIsLoaded = useApiIsLoaded()

  // console.log(`map: ${map}`)

  useEffect(() => {
    if (!placesLib || !map) return

    // console.log('effect')
    setPlacesService(new placesLib.PlacesService(map))
  }, [placesLib, map])

  useEffect(() => {
    if (!placesService || !clickedPlace || !apiIsLoaded) return

    const request = {
      location: clickedPlace,
      radius: 50,
      keyword: '飲食店 カフェ',
      maxResultCount: 1,
      languageCode: 'ja',
    }

    placesService.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setShow(true)
        setPlacesData(results)
      }
    })
  }, [placesService, clickedPlace])

  const handleSelectCarousel = place => {
    setSelectedCarousel(place)
  }

  useEffect(() => {
    if (!selectedCarousel) return
    map.fitBounds(selectedCarousel.geometry?.viewport)
  }, [selectedCarousel])

  useEffect(() => {
    const places = []
    if (placesData) {
      placesData.map(placeData => {
        places.push(placeData.place_id)
      })
      const getRestaurantData = async () => {
        const res = await axios.post('api/maps/reviews/search', { id: places })
        setRestaurantsData(res.data)
      }
      getRestaurantData()
    }
  }, [placesData])

  return (
    <>
      {show && (
        <>
          {selectedCarousel && (
            <AdvancedMarker position={selectedCarousel.geometry.location} />
          )}
          <Carousel className=" w-3/4 sm:w-4/5 max-w-2xl inset-x-0 mx-auto fixed bottom-20 sm:bottom-2 flex justify-center sm:left-5">
            <CarouselContent className="-ml-1">
              {placesData &&
                placesData.map((place, index) => (
                  <CarouselItem key={index} className="pl-1 ">
                    <div className="p-1">
                      <Card>
                        <CardContent className="aspect-square sm:aspect-auto sm:h-56 relative p-6">
                          <button
                            onClick={() => setShow(false)}
                            className="leading-none absolute border top-1 right-1 text-sm p-1 rounded-full">
                            ✕
                          </button>
                          {restaurantsData &&
                            restaurantsData.restaurantIds.includes(
                              place.place_id,
                            ) && (
                              <div className="flex justify-center sm:justify-start mb-2 sm:mb-0">
                                <VegeTag
                                  vegeTags={
                                    restaurantsData.vegeTags[place.place_id]
                                  }
                                  size="small"
                                  className="text-center"
                                />
                              </div>
                            )}
                          <div className="flex flex-col sm:flex-row w-full h-full items-center">
                            {place.photos && place.photos[0] && (
                              <div className="w-2/3 h-32 overflow-hidden sm:w-1/4 sm:mr-4 relative">
                                <img
                                  src={place.photos[0].getUrl()}
                                  alt="店舗画像"
                                  className="object-contain absolute top-1/2 left-1/2 transform	-translate-x-1/2 -translate-y-1/2 m-auto block"
                                />
                              </div>
                            )}
                            <div className="flex flex-col sm:w-3/4">
                              <div>
                                <div className="flex justify-end mt-1 sm:absolute top-6 right-12">
                                  <button
                                    className="border-b text-sm flex items-center"
                                    onClick={() => handleSelectCarousel(place)}>
                                    <FaMapMarkerAlt />
                                    <p>ここへ移動</p>
                                  </button>
                                </div>
                                <div className="font-semibold text-center my-4 sm:mt-0">
                                  {place.name}
                                </div>
                              </div>
                              {restaurantsData &&
                              restaurantsData.restaurantIds.includes(
                                place.place_id,
                              ) ? (
                                <div>
                                  {/* <div className="flex justify-center">
                                    <VegeTag
                                      vegeTags={
                                        restaurantsData.vegeTags[place.place_id]
                                      }
                                      size="small"
                                      className="text-center"
                                    />
                                  </div> */}

                                  <Link href={`/map/review/${place.place_id}/`}>
                                    <Button className="mx-auto bg-button block py-0 mt-2 border-button-color">
                                      レビューへ
                                    </Button>
                                  </Link>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-center">
                                    ベジクチコミはありません
                                  </p>
                                  <Link
                                    href={`/map/review/${place.place_id}/create?name=${place.name}&lat=${place.geometry ? place.geometry.location.lat() : ''}&lng=${place.geometry ? place.geometry.location.lng() : ''}`}>
                                    <Button className="mx-auto bg-button block py-1 mt-2 border-button-color">
                                      最初のクチコミを投稿
                                    </Button>
                                  </Link>
                                </div>
                              )}
                            </div>
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

export default CreateCarousel
