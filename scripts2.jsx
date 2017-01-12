function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}


class PlacesForm extends React.Component {
    constructor(props) {
        super(props);
        this.autoCompleteProcessor = this.autoCompleteProcessor.bind(this);
        this.zoomToCity = this.zoomToCity.bind(this);
    }

    zoomToCity(event) {
        var place = event.target.value;
        console.log(place);
        geocoder.geocode({
            'address': place
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                // Center map on location
                map.setCenter(results[0].geometry.location);
                map.setZoom(14);
            }
        });
    }


    autoCompleteProcessor(event) {
        event.preventDefault();
        var input = document.getElementById(event.target.id);
        var autocomplete = new google.maps.places.Autocomplete(input, {
            types: ['(cities)']
        });
    }

    render() {
        return(
            <form className="form-inline">
                <div className="form-group">
                    <input
                        id="start-location"
                        type="text"
                        className="form-control"
                        placeholder="Start location"
                        onChange={this.autoCompleteProcessor}
                        onBlur={this.zoomToCity}
                    />
                </div>
                <div className="form-group">
                    <input
                        id="end-location"
                        type="text"
                        className="form-control"
                        placeholder="Destination"
                        onChange={this.autoCompleteProcessor}
                        onBlur={this.zoomToCity}
                    />
                </div>
                <button type="submit" className="btn btn-info">Get directions</button>
            </form>
        )
    }
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapOptions: {
                center: {lat: 39.8282, lng: -98.5795},
                zoom: 4,
                styles: mapStyle
            }
        }
        this.initMap = this.initMap.bind(this);
    }

    componentDidMount() {
        window.initMap = this.initMap;
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAaEp9QYcNt6cq0NUJOk0UI8hhrfWTUfDY&libraries=places&callback=initMap');
    }

    initMap() {
        var options = this.state.mapOptions
        var directionsService = new google.maps.DirectionsService();
        var geocoder = new google.maps.Geocoder();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        this.map = new google.maps.Map(this.refs.map, options);
    }



    render() {
        return(
            <div className='map-container'>
                <div id="map" ref="map">Map should be here</div>
            </div>

        )
    }
}

function HeaderBar(props) {
    return(
        <nav className="navbar navbar-default" id="navbar">
            <div className="container-fluid">
                <div className="navbar-header">

                </div>
            </div>
        </nav>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className='main-wrapper'>
                <HeaderBar />
                <Map />
                <PlacesForm />
            </div>
        )
    }
}

ReactDOM.render(
    <ReactRouter.Router>
        <ReactRouter.Route path="/" component={App} >


        </ReactRouter.Route>
    </ReactRouter.Router>,
    document.getElementById('app')
)
