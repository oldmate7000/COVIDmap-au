const React = require('react')
const ReactDOM = require('react-dom');
const ReactLeaflet = require('react-leaflet')
const { Map: LeafletMap, TileLayer, Control, Marker, Popup } = ReactLeaflet
const $ = require('jquery')
const scale = require('d3-scale')
const colourscale = require ('d3-scale-chromatic')

import TopoJSON from './TopoJSON';
import './style.css';
// import { Control } from 'leaflet';
// import { gridLayer } from 'leaflet';


class NSW extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updated: false,
            map: {}
        }
        this.mapFromServer = this.mapFromServer.bind(this)
        this.COVIDFromServer = this.COVIDFromServer.bind(this)
        this.getCOVIDNumbers = this.getCOVIDNumbers.bind(this)
        this.getPostalAreas = this.getPostalAreas.bind(this)
        this.onEachFeature = this.onEachFeature.bind(this)
        this.highlightFeature = this.highlightFeature.bind(this)
        this.resetHighlight = this.resetHighlight.bind(this)
    }

    mapFromServer() {
        console.log('sending request for post code areas')
        return $.getJSON(window.location.origin + '/postcodes', {state:'nsw'})
    }

    COVIDFromServer() {
        console.log('time to get COVID numbers')
        return $.getJSON('/getCOVIDdata',{state:'nsw'})
    }

    getCOVIDNumbers() {
        this.COVIDFromServer().then((data) => {
            this.props.setMax(data)
            

            let geos = this.state.postcodes
            geos.objects.NSW_PC_100pc_TOPO.geometries.forEach(area => {
                if(data[area.properties.POA_CODE16]) {
                    area.properties['cvCases'] = data[area.properties.POA_CODE16]
                } else {
                    area.properties['cvCases'] = []
                }
            })

            this.setState({
                updated: true,
                map: geos,
            })
        })
    }

    getPostalAreas() {
        console.log('getPostalAreas')
        this.mapFromServer().then((data) => {
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

    highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
            fillOpacity: 0.85
        });
    }
    
    resetHighlight(e) {
        var layer = e.target;
    
        layer.setStyle({
            fillOpacity: 0.3
        });
    }

    onEachFeature(feature, layer){
        const popupContent = 
        `<Popup>
        Postcode: ${feature.properties.POA_CODE16}<br/>
        Total cases: ${feature.properties.cvCases.length}<br/>
        </Popup>`
        
        layer.bindPopup(popupContent)
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight
        });
    }

    render() {
        if (!(Object.keys(this.state.map).length === 0 && this.state.map.constructor === Object)) {
            return (
                <TopoJSON
                data = {this.state.map}
                style = {(feature) => {
                    // console.log(feature)
                    return {
                        color: 'black',
                        opacity: 1,
                        fillColor: this.props.colour(feature.properties.cvCases.length),
                        weight: 1,
                        fillOpacity: 0.3
                    }
                }}
                onEachFeature = {this.onEachFeature}
                />
            )
        } else {
            return (
                <div>Waiting on post code and case data for NSW</div>
            )
        }
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: -33.8567891,
            lng: 151.2151911,
            zoom: 11,
            maxCases: 0,
        }
        this.setMax = this.setMax.bind(this)
    }

    setMax(data) {
        let currentMax = this.state.maxCases
        
        for (const x in data) {
            if(data[x].length > currentMax) {
                currentMax = data[x].length
            }
        }

        this.setState({
            maxCases:currentMax
        })
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        var colour = scale.scaleSequential().domain([0, this.state.maxCases]).interpolator(colourscale.interpolateTurbo)
        return (
            <div>
                <LeafletMap center={position} zoom={this.state.zoom}>
                    <TileLayer
                    attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution/">CARTO</a>'
                    url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
                    />
                    <NSW
                        colour = {colour}
                        setMax = {this.setMax}
                    />
                    {/* <Control
                    position='bottom-right'
                    /> */}
                </LeafletMap>
            </div>
            
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));