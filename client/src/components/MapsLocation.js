import { useState, useCallback, useRef } from "react";
// * below packages for GMaps
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// * above pacakges for GMaps
// package to get time relatively
import { formatRelative } from "date-fns";

import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

// using GMaps library: "places"
const libraries = ["places"];
// GMaps Container Styling
const mapContainerStyle = {
  width: "80vw",
  height: "80vh",
};
// Set center GMaps to MONAS, Jakarta
const center = {
  lat: -6.17399,
  lng: 106.826851,
};
// Styling GMaps styles, for this case no style yet
const options = {
  // styles:
};

export default function MapsLocation() {
  // declare and render GMaps, using useLoadScript hooks
  const { isLoaded, loadError } = useLoadScript({
    // TODO masukin env
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // declare Markers (PIN) state
  const [markers, setMarkers] = useState([]);

  // state for user selecting marker
  const [selected, setSelected] = useState(null);

  // hooks useCallback, TRIGERRED when array value is changing
  const onMapCLick = useCallback((event) => {
    // event click, give Location Latitude/Longitude and set Marker
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
    console.log(markers);
  }, []);

  const mapRef = useRef();
  // move google maps coordinate to the center
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // move google maps coordinate to the location from search bar
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <h1>Events</h1>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onClick={onMapCLick}
        // when onLoad, calling useCallback hooks
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          // Set marker when clicking map, get from markerState
          <Marker
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              // user click marker, set to local state "selected"
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Location selected!</h2>
              <p>selected time {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
}

function Locate({ panTo }) {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src='compass.svg' alt='compass - locate me' />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: {
        lat: () => -6.17399,
        lng: () => 106.826851,
      },
      // meters * 1000 = Kilometers
      radius: 200 * 1000,
    },
  });

  return (
    <div>
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            // get GeoCode from search
            const results = await getGeocode({ address });
            // console.log(results[0]);
            const { lat, lng } = await getLatLng(results[0]);
            // console.log(lat, lng);
            panTo({ lat, lng });

            // console.log(address);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          disabled={!ready}
          placeholder='Enter a location'
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={description} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
