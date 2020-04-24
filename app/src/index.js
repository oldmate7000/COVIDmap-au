const $ = require('jquery')
const React = require('react')
const ReactDOM = require('react-dom');
const ReactLeaflet = require('react-leaflet')
const { Map: LeafletMap, TileLayer } = ReactLeaflet
import Control from 'react-leaflet-control';

const scale = require('d3-scale')
const colourscale = require ('d3-scale-chromatic')

import TopoJSON from './TopoJSON';
import './style.css';

import turboscale from './assets/turboscale.png'


class WA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updated: false,
            map: {}
        }
        this.mapFromServer = this.mapFromServer.bind(this)
        this.COVIDFromServer = this.COVIDFromServer.bind(this)
        this.getCOVIDNumbers = this.getCOVIDNumbers.bind(this)
        this.getServerUpdate = this.getServerUpdate.bind(this)
        this.onEachFeature = this.onEachFeature.bind(this)
    }

    mapFromServer() {
        // console.log("sending request for WA LGA's map")
        return $.getJSON(window.location.origin + '/maps', {state:'wa'})
    }

    COVIDFromServer() {
        // console.log('getting covid numbers for WA')
        return $.getJSON('/getCOVIDdata', {state:'wa'})
    }

    getCOVIDNumbers() {
        this.COVIDFromServer().then((data) => {
            this.props.setMax('wa', data)
            // console.log(data)

            let geos = this.state.map
            geos.objects.WA_LGA_100pc_TOPO.geometries.forEach(area => {
                if(data[area.properties.LGA_NAME19]) {
                    area.properties['cvCases'] = data[area.properties.LGA_NAME19]
                } else {
                    area.properties['cvCases'] = 0
                }
            })

            // console.log(geos)
            this.setState({
                updated: true,
                map: geos,
            })
        })
    }

    getServerUpdate() {
        // console.log('getPostalAreas')
        this.mapFromServer().then((data) => {
            // console.log(data)
            this.setState({
                map: data
            })
            this.getCOVIDNumbers()
        })
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
        LGA Name: ${feature.properties.LGA_NAME19}<br/>
        Total cases: ${feature.properties.cvCases.toString()}<br/>
        </Popup>`
        
        layer.bindPopup(popupContent)
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight
        });
    }

    componentDidMount() {
        this.getServerUpdate()
    }

    render() {
        if(this.props.displaystate) {
            if (this.state.updated) {
                return (
                    <TopoJSON
                    data = {this.state.map}
                    style = {(feature) => {
                        // console.log(feature)
                        return {
                            color: this.props.colour(feature.properties.cvCases),
                            opacity: 0.5,
                            fillColor: this.props.colour(feature.properties.cvCases),
                            weight: 1,
                            fillOpacity: 0.3
                        }
                    }}
                    onEachFeature = {this.onEachFeature}
                    />
                )
            } else {
                return (
                    <Control position="topleft" >
                        <div className="loadinginfo">Loading in map and case data for Western Australia</div>
                    </Control>
                )
            }
        } else {
            return null
        }
    }
}

class QLD extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updated: false,
            map: {}
        }
        this.mapFromServer = this.mapFromServer.bind(this)
        this.COVIDFromServer = this.COVIDFromServer.bind(this)
        this.getCOVIDNumbers = this.getCOVIDNumbers.bind(this)
        this.getServerUpdate = this.getServerUpdate.bind(this)
        this.onEachFeature = this.onEachFeature.bind(this)
    }

    mapFromServer() {
        // console.log("sending request for QLD LGA's map")
        return $.getJSON(window.location.origin + '/maps', {state:'qld'})
    }

    COVIDFromServer() {
        // console.log('getting covid numbers for QLD')
        return $.getJSON('/getCOVIDdata', {state:'qld'})
    }

    getCOVIDNumbers() {
        this.COVIDFromServer().then((data) => {
            this.props.setMax('qld', data)
            // console.log(data)

            let geos = this.state.map
            geos.objects.QLD_LGA_100pc_TOPO.geometries.forEach(area => {
                let searchTerm = area.properties.LGA_NAME19.split(' ').filter((word) => {return !word.match(/\(/)}).join(' ').toLowerCase()
                // console.log(searchTerm)
                if(data[searchTerm]) {
                    area.properties['cvCases'] = data[searchTerm]
                } else {
                    area.properties['cvCases'] = 0
                }
            })

            // console.log(geos)
            this.setState({
                updated: true,
                map: geos,
            })
        })
    }

    getServerUpdate() {
        // console.log('getPostalAreas')
        this.mapFromServer().then((data) => {
            // console.log(data)
            this.setState({
                map: data
            })
            this.getCOVIDNumbers()
        })
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
        LGA Name: ${feature.properties.LGA_NAME19}<br/>
        Total cases: ${feature.properties.cvCases.toString()}<br/>
        </Popup>`
        
        layer.bindPopup(popupContent)
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight
        });
    }

    componentDidMount() {
        this.getServerUpdate()
    }

    render() {
        if (this.props.displaystate) {
            if (this.state.updated) {
                return (
                    <TopoJSON
                    data = {this.state.map}
                    style = {(feature) => {
                        // console.log(feature)
                        return {
                            color: this.props.colour(feature.properties.cvCases),
                            opacity: 0.5,
                            fillColor: this.props.colour(feature.properties.cvCases),
                            weight: 1,
                            fillOpacity: 0.3
                        }
                    }}
                    onEachFeature = {this.onEachFeature}
                    />
                )
            } else {
                return (
                    <Control position="topleft" >
                        <div className="loadinginfo">Loading in map and case data for Queensland</div>
                    </Control>
                )
            }
        } else {
            return null
        }

    }
}

class VIC extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            updated: false,
            map: {}
        }
        this.mapFromServer = this.mapFromServer.bind(this)
        this.COVIDFromServer = this.COVIDFromServer.bind(this)
        this.getCOVIDNumbers = this.getCOVIDNumbers.bind(this)
        this.getServerUpdate = this.getServerUpdate.bind(this)
        this.onEachFeature = this.onEachFeature.bind(this)
    }

    mapFromServer() {
        // console.log("sending request for VIC LGA's map")
        return $.getJSON(window.location.origin + '/maps', {state:'vic'})
    }

    COVIDFromServer() {
        // console.log('getting covid numbers for VIC')
        return $.getJSON('/getCOVIDdata', {state:'vic'})
    }

    getCOVIDNumbers() {
        this.COVIDFromServer().then((data) => {
            this.props.setMax('vic', data)
            // console.log(data)

            let geos = this.state.map
            geos.objects.VIC_LGA_100pc_TOPO.geometries.forEach(area => {
                if(data[area.properties.LGA_NAME19]) {
                    area.properties['cvCases'] = data[area.properties.LGA_NAME19]
                } else {
                    area.properties['cvCases'] = 0
                }
            })

            // console.log(geos)
            this.setState({
                updated: true,
                map: geos,
            })
        })
    }

    getServerUpdate() {
        // console.log('getPostalAreas')
        this.mapFromServer().then((data) => {
            // console.log(data)
            this.setState({
                map: data
            })
            this.getCOVIDNumbers()
        })
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
        LGA Name: ${feature.properties.LGA_NAME19}<br/>
        Total cases: ${feature.properties.cvCases.toString()}<br/>
        </Popup>`
        
        layer.bindPopup(popupContent)
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight
        });
    }

    componentDidMount() {
        this.getServerUpdate()
    }

    render() {
        if (this.props.displaystate) {
            if (this.state.updated) {
                return (
                    <TopoJSON
                    data = {this.state.map}
                    style = {(feature) => {
                        // console.log(feature)
                        return {
                            color: this.props.colour(feature.properties.cvCases),
                            opacity: 0.5,
                            fillColor: this.props.colour(feature.properties.cvCases),
                            weight: 1,
                            fillOpacity: 0.3
                        }
                    }}
                    onEachFeature = {this.onEachFeature}
                    />
                )
            } else {
                return (
                    <Control position="topleft" >
                        <div className="loadinginfo">Loading in map and case data for Victoria</div>
                    </Control>
                )
            }
        } else {
            return null
        }

    }
}

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
        // console.log('sending request for NSW postcode map')
        return $.getJSON(window.location.origin + '/maps', {state:'nsw'})
    }

    COVIDFromServer() {
        // console.log('time to get COVID numbers for NSW')
        return $.getJSON('/getCOVIDdata', {state:'nsw'})
    }

    getCOVIDNumbers() {
        this.COVIDFromServer().then((data) => {
            // console.log(data)
            this.props.setMax('nsw', data)
            

            let geos = this.state.map
            geos.objects.NSW_PC_100pc_TOPO.geometries.forEach(area => {
                if(data[area.properties.POA_CODE16]) {
                    area.properties['cvCases'] = data[area.properties.POA_CODE16]
                } else {
                    area.properties['cvCases'] = 0
                }
            })

            this.setState({
                updated: true,
                map: geos,
            })
        })
    }

    getPostalAreas() {
        // console.log('getPostalAreas')
        this.mapFromServer().then((data) => {
            // console.log(data)
            this.setState({
                map: data
            })
            this.getCOVIDNumbers()
        })
    }

    componentDidMount() {
        this.getPostalAreas()
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
        Total cases: ${feature.properties.cvCases.toString()}<br/>
        </Popup>`
        
        layer.bindPopup(popupContent)
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight
        });
    }

    render() {
        if(this.props.displaystate) {
            if (this.state.updated) {
                return (
                    <TopoJSON
                    data = {this.state.map}
                    style = {(feature) => {
                        // console.log(feature)
                        return {
                            color: this.props.colour(feature.properties.cvCases),
                            opacity: 0.5,
                            fillColor: this.props.colour(feature.properties.cvCases),
                            weight: 1,
                            fillOpacity: 0.3
                        }
                    }}
                    onEachFeature = {this.onEachFeature}
                    />
                )
            } else {
                return (
                    <Control position="topleft" >
                        <div className="loadinginfo">Loading in map and case data for New South Wales</div>
                    </Control>
                )
            }
        } else {
            return null
        }
        
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: -27.5977572,
            lng: 134.4407826,
            zoom: 5,
            dispMaxes: {},
            suppMaxes: {},
            maxCases: 0,
            displayNSW: true,
            displayQLD: true,
            displayVIC: true,
            displayWA: true,
        }
        this.setMax = this.setMax.bind(this)
        this.moveend = this.moveend.bind(this)
        this.switchdisplay = this.switchdisplay.bind(this)
        this.switchMax = this.switchMax.bind(this)
    }

    switchMax(stateName) {
        let suppMaxes = this.state.suppMaxes
        let dispMaxes = this.state.dispMaxes

        if (Object.keys(dispMaxes).includes(stateName)) {
            // console.log(dispMaxes[stateName])
            suppMaxes[stateName] = dispMaxes[stateName]
            delete dispMaxes[stateName]
        } else if (Object.keys(suppMaxes).includes(stateName)) {
            dispMaxes[stateName] = suppMaxes[stateName]
            delete suppMaxes[stateName]
        }

        let newMaxCases = 0
        Object.keys(dispMaxes).forEach((key) => {
            if (dispMaxes[key] > newMaxCases) newMaxCases = dispMaxes[key]
        })

        this.setState({
            'suppMaxes': suppMaxes,
            'dispMaxes': dispMaxes,
            'maxCases': newMaxCases
        })
    }
    
    setMax(stateName, data) {
        let currentMax = this.state.maxCases
        let stateMax = 0

        // console.log(data)
        // console.log(stateName)
        
        for (const x in data) {
            if(data[x] > stateMax) {
                stateMax = data[x]
            }
        }

        if (stateMax > currentMax) {
            currentMax = stateMax
        }

        this.setState(function(state) {
            return {
                dispMaxes: {...state.dispMaxes, [stateName]: stateMax},
                maxCases:currentMax
            }
        })
    }

    moveend(e) {
        this.setState({
            lat: e.target.getCenter().lat,
            lng: e.target.getCenter().lng,
            zoom: e.target.getZoom()
        })
    }

    switchdisplay(e) {
        let stateName = e.target.value
        switch(stateName) {
            case 'nsw':
                this.setState((state) => ({
                    displayNSW: !(state.displayNSW)
                }))
                break;
            case 'vic':
                this.setState((state) => ({
                    displayVIC: !(state.displayVIC)
                }))
                break;
            case 'qld':
                this.setState((state) => ({
                    displayQLD: !(state.displayQLD)
                }))
                break;
            case 'wa':
                this.setState((state) => ({
                    displayWA: !(state.displayWA)
                }))
                break;
        }

        this.switchMax(stateName)
    }

    render() {
        var colour = scale.scaleSequential().domain([0, this.state.maxCases]).interpolator(colourscale.interpolateTurbo)
        return (
            <div>
                <LeafletMap
                center={[this.state.lat, this.state.lng]}
                zoom={this.state.zoom}
                onmoveend={this.moveend}
                >
                    <TileLayer
                    attribution='&copy; <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution/" target="_blank">CARTO</a>, <a href="https://www.theguardian.com/australia-news/datablog/ng-interactive/2020/apr/15/coronavirus-australia-numbers-how-many-new-cases-today-deaths-death-toll-covid-19-stats-graph-map-by-postcode" target="_blank">The Guardian</a>'
                    url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
                    />
                    <NSW
                        colour = {colour}
                        setMax = {this.setMax}
                        displaystate  = {this.state.displayNSW}
                    />
                    <VIC
                        colour = {colour}
                        setMax = {this.setMax}
                        displaystate  = {this.state.dispMaxes['vic']? true: false}
                    />
                    <QLD
                        colour = {colour}
                        setMax = {this.setMax}
                        displaystate  = {this.state.displayQLD}
                    />
                    <WA
                        colour = {colour}
                        setMax = {this.setMax}
                        displaystate  = {this.state.displayWA}
                    />
                    <Control position='bottomleft'>
                        <div id='legend'>
                            <h1 className='title'>0</h1>
                            <img src={turboscale}/>
                            <h1 className='title'>{this.state.maxCases}</h1>
                        </div>
                        
                    </Control>
                    <Control position='bottomright'>
                        <div className="buttons">
                            <div>Currently centered on <br/>{this.state.lat.toFixed(4)}<br/> {this.state.lng.toFixed(4)}<br/> and at zoom level: {this.state.zoom}</div>
                            <button className='button is-small is-fullwidth' onClick={() => {this.setState({lat: -37.905741263083954, lng: 145.10879516601565, zoom: 10})}}>Snap to Melbourne</button>
                            <button className='button is-small is-fullwidth' onClick={() => {this.setState({lat: -33.83420513593713, lng: 151.14646911621097, zoom: 11})}}>Snap to Sydney</button>
                            <button className='button is-small is-fullwidth' onClick={() => {this.setState({lat: -27.548459140257656, lng: 153.18786621093753, zoom: 9})}}>Snap to Brisbane</button>
                            <button className='button is-small is-fullwidth' onClick={() => {this.setState({lat: -31.962939927942937, lng: 115.87348937988283, zoom: 11})}}>Snap to Perth</button>
                            <button className='button is-small is-fullwidth' onClick={() => {this.setState({lat: -27.5977572, lng: 134.4407826, zoom: 5})}}>Snap to Australia</button>
                            <br/>
                            <button className='button is-small is-fullwidth' onClick={this.switchdisplay} value='nsw'>Toggle NSW</button>
                            <button className='button is-small is-fullwidth' onClick={this.switchdisplay} value='qld'>Toggle QLD</button>
                            <button className='button is-small is-fullwidth' onClick={this.switchdisplay} value='vic'>Toggle VIC</button>
                            <button className='button is-small is-fullwidth' onClick={this.switchdisplay} value='wa'>Toggle WA</button>
                        </div>

                    </Control>
                </LeafletMap>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));