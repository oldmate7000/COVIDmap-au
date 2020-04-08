const React = require('react')
const ReactDOM = require('react-dom');
const ReactLeaflet = require('react-leaflet')
const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet
const $ = require('jquery')
const scale = require('d3-scale')
const colourscale = require ('d3-scale-chromatic')

import TopoJSON from './TopoJSON';
import './style.css';
// import { gridLayer } from 'leaflet';

function getPostCodes() {
    console.log('sending request for post code areas')
    return $.getJSON(window.location.origin + '/postcodes')
}

function getCOVIDNumbers() {
    console.log('time to get COVID numbers')
    return $.getJSON('/getCOVIDdata')
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: -33.8567891,
            lng: 151.2151911,
            zoom: 11,
            cases: false,
            maxCases: 0,
            postcodes: {},
            suburbs: {}
        }
        this.getCOVIDNumbers = this.getCOVIDNumbers.bind(this)
        this.getPostalAreas = this.getPostalAreas.bind(this);
        
    }

    getCOVIDNumbers() {
        getCOVIDNumbers().then((data) => {
            let maxCaseCount = 0
            for (const x in data) {
                if(data[x].length > maxCaseCount) {
                    maxCaseCount = data[x].length
                }
            } 
            

            let geos = this.state.postcodes
            geos.objects.POA_2016_AUST.geometries.forEach(area => {
                if(data[area.properties.POA_CODE16]) {
                    area.properties['cvCases'] = data[area.properties.POA_CODE16]
                } else {
                    area.properties['cvCases'] = []
                }
            })

            this.setState({
                cases: true,
                postcodes: geos,
                maxCases: maxCaseCount
            })
        })
    }

    getPostalAreas() {
        console.log('getPostalAreas')
        getPostCodes().then((data) => {
            console.log(data)
            this.setState({
                postcodes: data
            })
        })
    }

    componentDidMount() {
        this.getPostalAreas()
        this.getCOVIDNumbers()
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        var colour = scale.scaleSequential().domain([0, this.state.maxCases]).interpolator(colourscale.interpolateTurbo);
        if (!(Object.keys(this.state.postcodes).length === 0 && this.state.postcodes.constructor === Object)) {
            if(this.state.cases) {
                return (
                    <LeafletMap center={position} zoom={this.state.zoom}>
                        <TileLayer
                        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                        // url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
                        // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution/">CARTO</a>'
                        url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
                        />
                        <TopoJSON
                        data = {this.state.postcodes}
                        style = {(feature) => {
                            console.log(feature)
                            return {
                                color: 'black',
                                opacity: 0.3,
                                fillColor: colour(feature.properties.cvCases.length),
                                weight: 1,
                                fillOpacity: 0.5
                            }
                        }}
                        />
                        <Marker position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br/> Easily customizable.
                            </Popup>
                        </Marker>
                    </LeafletMap>
                )
            } else {
                return (
                    <div>
                        waiting on case data
                    </div>
                )
            }

        } else {
            return (
                <div>
                    waiting on post code area data
                </div>
            )
        }
    }
}

ReactDOM.render(<App />, document.getElementById('app'));