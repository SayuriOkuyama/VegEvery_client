import React, { useEffect, useState, useCallback } from 'react'
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconContext } from 'react-icons' //IconContextをインポート
import { PiMagnifyingGlassLight } from 'react-icons/pi'

const AutoComplete = ({ setSelectedPlace }) => {
  const map = useMap()
  const places = useMapsLibrary('places')

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] = useState()

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  // オートコンプリート サービス インスタンス
  const [autocompleteService, setAutocompleteService] = useState(null)

  // https://developers.google.com/maps/documentation/javascript/reference/places-service
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

  const fetchPredictions = useCallback(
    async inputValue => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([])
        return
      }

      const request = { input: inputValue, sessionToken }
      const response = await autocompleteService.getPlacePredictions(request)

      setPredictionResults(response.predictions)
    },
    [autocompleteService, sessionToken],
  )

  const onInputChange = useCallback(
    event => {
      const value = event.target?.value

      setInputValue(value)
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
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken,
      }

      // getDetails が成功した時に実行する関数
      const detailsRequestCallback = placeDetails => {
        console.log(placeDetails)
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

  return (
    <div className="w-dvw flex justify-end items-center mt-5 mr-2">
      <div className="ml-auto">
        <div className="flex items-center">
          <Input
            value={inputValue}
            onInput={event => onInputChange(event)}
            placeholder="Search for a place"
            type="text"
            className="pr-0 block w-72 h-8 ml-auto"
          />
          <Button
            onClick={() => MapController()}
            className="py-3 px-1 ml-1 border border-button-color h-6 bg-button">
            <IconContext.Provider
              value={{ size: '16px', className: 'p-0 ml-0 mr-0' }}>
              <PiMagnifyingGlassLight className="self-center text-lg" />
            </IconContext.Provider>
          </Button>
        </div>
        {predictionResults.length > 0 && (
          <ul className="bg-white mt-2 mr-1 p-2">
            {predictionResults.map(({ place_id, description }) => {
              return (
                <li
                  key={place_id}
                  className="custom-list-item"
                  onClick={() => handleSuggestionClick(place_id)}>
                  {description}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AutoComplete
