import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import { Logo } from './Logo';

import './Map.css';

export class Map extends Component {
    constructor(props) {
        super(props);
        mapboxgl.accessToken = props.mapboxAccessToken
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/outdoors-v10',
            zoom: 1
        });
        map.addControl(new mapboxgl.NavigationControl());
        this.props.setMap(map);
    }

    render() {
        return (
            <div className="map-wrapper">
                <div id="map"></div>
                {
                    !this.props.loggedIn &&
                    <div className="map-overlay">
                        Sign In For Access
                    </div>
                }
            </div>
        );
    }
}