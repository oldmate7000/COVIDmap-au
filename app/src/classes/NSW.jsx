const React = require('react')
import Control from 'react-leaflet-control';
import baseStateComponent from './baseStateComponent'
import TopoJSON from './TopoJSON';

class NSW extends baseStateComponent {
    constructor(props) {
        super(props)
        this.state = {
            updated: false,
            map: {}
        }
        this.getCOVIDNumbers = this.getCOVIDNumbers.bind(this)
        this.onEachFeature = this.onEachFeature.bind(this)
    }

    getCOVIDNumbers() {
        this.COVIDFromServer('nsw').then((data) => {
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

    componentDidMount() {
        this.getServerUpdate('nsw')
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

export default NSW