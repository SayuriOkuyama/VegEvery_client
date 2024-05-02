import React, { useEffect, useState, useCallback } from 'react'
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'

const AutoComplete = ({ setSelectedPlace, setClickedPlace }) => {
  const map = useMap()
  const places = useMapsLibrary('places')

  const [sessionToken, setSessionToken] = useState()

  // オートコンプリート サービス インスタンス
  const [autocompleteService, setAutocompleteService] = useState(null)

  // place サービス インスタンス
  const [placesService, setPlacesService] = useState(null)

  // 検索場所の詳細情報
  const [predictionResults, setPredictionResults] = useState([])

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (!places || !map) return

    // 各サービスのインスタンスとトークンを state に入れておく
    setAutocompleteService(new places.AutocompleteService())
    setPlacesService(new places.PlacesService(map))
    setSessionToken(new places.AutocompleteSessionToken())

    return () => setAutocompleteService(null)
  }, [map, places])

  // 検索をワードでデータをフェッチ
  const fetchPredictions = useCallback(
    async inputValue => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([])
        return
      }

      // 検索ワードとトークンを渡して place 情報をフェッチ
      const request = { input: inputValue, sessionToken }
      const response = await autocompleteService.getPlacePredictions(request)
      // console.log(response)

      // 検索結果の詳細情報をセットし、サジェストのリストを表示する
      setPredictionResults(response.predictions)
    },
    [autocompleteService, sessionToken],
  )

  const onInputChange = useCallback(
    event => {
      const value = event.target?.value

      setInputValue(value)
      // 検索データを取得してくる
      fetchPredictions(value)
    },
    [fetchPredictions],
  )

  // サジェエストされた検索結果をクリックしたときに発火
  // useCallback で、変わらない時には発火しないようにする
  const handleSuggestionClick = useCallback(
    placeId => {
      if (!places) return

      // 取得する情報
      const detailRequestOptions = {
        placeId,
        fields: [
          'geometry',
          'name',
          'formatted_address',
          'icon',
          'business_status',
          'opening_hours',
          'place_id',
          'photos',
          'rating',
          'reviews',
          'types',
          'url',
          'website',
          'formatted_address',
          'formatted_phone_number',
        ],
        sessionToken,
      }

      // getDetails が成功した時に実行する関数
      const detailsRequestCallback = placeDetails => {
        // console.log(placeDetails)
        // ここでセットして、MapHandler コンポーネントで画面表示に使う
        setSelectedPlace(placeDetails)
        // サジェストを消す
        setPredictionResults([])
        // 検索ワードを住所に置き換えて input にいれる
        setInputValue(placeDetails?.formatted_address ?? '')
        // setSessionToken(new places.AutocompleteSessionToken())
      }

      // ↑ のオプションと関数を渡して、place 情報を取得する
      placesService?.getDetails(detailRequestOptions, detailsRequestCallback)
    },
    [setSelectedPlace, places, placesService, sessionToken],
  )

  // テキスト検索をクリックしたときに発火
  // useCallback で、変わらない時には発火しないようにする
  // const handleTextSearchClick = useCallback(
  //   value => {
  //     // console.log('handleTextSearchClick!!')
  //     // console.log(value)
  //     if (!value) return
  //     // console.log('valueあり!!')

  //     const bounds = map.getBounds()

  //     var request = {
  //       bounds: bounds,
  //       radius: 100,
  //       keyword: value,
  //     }

  //     // getDetails が成功した時に実行する関数
  //     const callback = placeDetails => {
  //       // console.log(placeDetails)
  //       // ここでセットして、MapHandler コンポーネントで画面表示に使う
  //       setSelectedPlace(placeDetails)
  //       // サジェストを消す
  //       setPredictionResults([])
  //       // setSessionToken(new places.AutocompleteSessionToken())
  //       setMarkersData(placeDetails)
  //     }

  //     // ↑ のオプションと関数を渡して、place 情報を取得する
  //     placesService?.nearbySearch(request, callback)
  //   },
  //   [inputValue, places, placesService, sessionToken],
  // )

  const handleSearch = () => {
    const center = map.getCenter()
    setClickedPlace(center)
  }

  return (
    <div className="w-dvw flex justify-end items-center mt-5 mr-2">
      <div className="ml-auto">
        <div className="flex items-center">
          <Input
            value={inputValue}
            onInput={event => onInputChange(event)}
            placeholder="マップを移動"
            type="text"
            className="pr-0 block w-72 h-8 ml-auto focus:text-base"
          />
        </div>
        {predictionResults.length > 0 && (
          <ul className="bg-white rounded-sm mt-2 mr-1 p-2 space-y-1">
            {/* <li
                key={1}
                className=" border-b-2 text-xs"
                onClick={() => handleTextSearchClick(inputValue)}>
                {inputValue}
              </li> */}
            {predictionResults.map(({ place_id, description }) => {
              return (
                <li
                  key={place_id}
                  className=" border-b-2 text-xs"
                  onClick={() => handleSuggestionClick(place_id)}>
                  {description}
                </li>
              )
            })}
          </ul>
        )}
        <Button
          onClick={handleSearch}
          className="mt-2 border-button-color bg-button py-2 px-2 h-7 sm:text-base sm:p-4">
          このエリアのお店を表示
          <IconContext.Provider
            value={{ size: '16px', className: 'p-0 ml-0 mr-0' }}>
            <PiMagnifyingGlassLight className="self-center text-lg" />
          </IconContext.Provider>
        </Button>
      </div>
    </div>
  )
}

export default AutoComplete
