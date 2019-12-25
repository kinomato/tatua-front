import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import PropTypes from 'prop-types'

function Map(props) {
    return (
        <GoogleMap
            id='example-map'
            mapContainerStyle={{
                height: "400px",
                width: "inherit"
            }}
            zoom={15}
            center={{
                lat: props.lat ? props.lat : 10.8652,
                lng: props.lng ? props.lng : 106.60080679999999
            }}>
            <Marker
                onLoad={marker => {
                    console.log('marker: ', marker)
                }}
                position={{
                    lat: props.lat ? props.lat : 10.8652,
                    lng: props.lng ? props.lng : 106.60080679999999
                }}
            />
        </GoogleMap>
    )
}

Map.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
}

export default Map