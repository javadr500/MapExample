import React, { Component } from 'react';

import { Card, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';


import {
  Map as MapLeaflet, TileLayer as TileLayerLeaflet,
  Marker, Popup, LayerGroup, Circle
} from 'react-leaflet'
import L from 'leaflet'
import LocationApi from '../api/v1/LocationApi';



export let positionIcon = new L.Icon({
  iconUrl: require('../assets/img/position.svg'),
  iconRetinaUrl: require('../assets/img/position.svg'),
  iconSize: [38, 50],
  iconAnchor: [20, 30],
  popupAnchor: [-3, -76],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})


export class Home extends Component {
  static displayName = Home.name;

  state = {
    locations: [],
    baseImageUrl: '/api/v1/file/download/',
    center: {
      lat: 51.505,
      lng: -0.09
    }
  }



  constructor(props) {
    super(props)

    this.selectionMarkerRef = React.createRef();

  }


  componentDidMount() {

    const that = this;
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    });
    //
    LocationApi.get()
      .then(r => {
        this.setState({ locations: r.data })
      })

  }



  render() {
    const center = [this.state.center.lat, this.state.center.lng];
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    return (
      <div>
        <MapLeaflet
          ref={this.mapLeaflet}
          center={center} zoom={9}
          trackResize={true} dragging={true} boxZoom={true}
          style={{ height: "400px" }}
        >
          <TileLayerLeaflet
            attribution='{&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors}'
            url={mbUrl}
            opacity={0.9}
            id='mapbox.light'
          />
          {this.state.locations.map(r =>
            <Marker key={r.locationId} position={[r.lat, r.lng]} icon={positionIcon} >
              <Popup minWidth={90} >
                <img src={this.state.baseImageUrl + r.logoId} alt={r.name} class="img-thumbnail"
                 width="256" height="128" />
                <h4>{r.name}</h4>
                <p>location Type: <b>{r.locationTypeName}</b></p>
              </Popup>
            </Marker>)}
        </MapLeaflet>
        
        </div>
    );
  }
}
