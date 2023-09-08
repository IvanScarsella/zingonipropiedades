"use client"

import GoogleMapReact from 'google-map-react';
import MyMarker from './marker/page';

function GoogleMap({
    propertyName,
    lat,
    lng
}) {

    const defaultProps = {
        center: {
            lat: lat,
            lng: lng,
        },
        zoom: 15
    };

    // function _onClick(obj){ console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);}

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '60%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.GOOGLEMAPS_KEY }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                    // zoomControl: false,
                    // streetviewControl: false,
                    // mapTypeControl: false,
                    // fullscreenControl: false,
                }}
                // onClick={_onClick}
            >
                <MyMarker lat={defaultProps.center.lat} lng={defaultProps.center.lng} text={propertyName} tooltip={propertyName} />
            </GoogleMapReact>
        </div>
    );
}

export default GoogleMap
 //MARKER:

// [Function: t] {
//     propTypes: {
//       apiKey: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       bootstrapURLKeys: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       defaultCenter: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       center: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       defaultZoom: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       zoom: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onBoundsChange: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChange: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onClick: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildClick: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildMouseDown: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildMouseUp: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildMouseMove: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildMouseEnter: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildMouseLeave: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onZoomAnimationStart: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onZoomAnimationEnd: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onDrag: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onDragEnd: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onMapTypeIdChange: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onTilesLoaded: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       options: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       distanceToMouse: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       hoverDistance: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       debounced: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       margin: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       googleMapLoader: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onGoogleApiLoaded: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       yesIWantToUseGoogleMapApiInternals: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       draggable: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       style: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       resetBoundsOnResize: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       layerTypes: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       shouldUnregisterMapOnUnmount: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       }
//     },
//     defaultProps: {
//       distanceToMouse: [Function: distanceToMouse],
//       hoverDistance: 30,
//       debounced: true,
//       options: [Function: options],
//       googleMapLoader: [Function: k],
//       yesIWantToUseGoogleMapApiInternals: false,
//       style: {
//         width: '100%',
//         height: '100%',
//         margin: 0,
//         padding: 0,
//         position: 'relative'
//       },
//       layerTypes: [],
//       heatmap: {},
//       heatmapLibrary: false,
//       shouldUnregisterMapOnUnmount: true
//     },
//     googleMapLoader: [Function: k],
//     convertNeSwToNwSe: [Function: fe],
//     convertNwSeToNeSw: [Function: ve],
//     fitBounds: [Function: fitBounds],
//     meters2ScreenPixels: [Function: meters2ScreenPixels],
//     tile2LatLng: [Function: tile2LatLng],
//     latLng2Tile: [Function: latLng2Tile],
//     getTilesIds: [Function: getTilesIds]
//   }




























//MAP

// [Function: t] {
//     propTypes: {
//       apiKey: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       bootstrapURLKeys: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       defaultCenter: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       center: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       defaultZoom: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       zoom: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onBoundsChange: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChange: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onClick: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildClick: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildMouseDown: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildMouseUp: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildMouseMove: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildMouseEnter: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onChildMouseLeave: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onZoomAnimationStart: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onZoomAnimationEnd: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onDrag: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onDragEnd: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onMapTypeIdChange: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onTilesLoaded: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       options: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       distanceToMouse: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       hoverDistance: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       debounced: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       margin: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       googleMapLoader: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       onGoogleApiLoaded: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       yesIWantToUseGoogleMapApiInternals: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       draggable: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       style: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       resetBoundsOnResize: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       layerTypes: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       },
//       shouldUnregisterMapOnUnmount: [Function: bound checkType] {
//         isRequired: [Function: bound checkType]
//       }
//     },
//     defaultProps: {
//       distanceToMouse: [Function: distanceToMouse],
//       hoverDistance: 30,
//       debounced: true,
//       options: [Function: options],
//       googleMapLoader: [Function: k],
//       yesIWantToUseGoogleMapApiInternals: false,
//       style: {
//         width: '100%',
//         height: '100%',
//         margin: 0,
//         padding: 0,
//         position: 'relative'
//       },
//       layerTypes: [],
//       heatmap: {},
//       heatmapLibrary: false,
//       shouldUnregisterMapOnUnmount: true
//     },
//     googleMapLoader: [Function: k],
//     convertNeSwToNwSe: [Function: fe],
//     convertNwSeToNeSw: [Function: ve],
//     fitBounds: [Function: fitBounds],
//     meters2ScreenPixels: [Function: meters2ScreenPixels],
//     tile2LatLng: [Function: tile2LatLng],
//     latLng2Tile: [Function: latLng2Tile],
//     getTilesIds: [Function: getTilesIds]
//   }