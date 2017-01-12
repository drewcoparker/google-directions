
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();
var map;
// Create a new map object and call it bellow
function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();

    var mapOptions = {
            center: {lat: 39.8282, lng: -98.5795},
            zoom: 4,
            styles: mapStyle
        }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
}
initialize();


class Map extends React.Component {
    constructor(props) {
        super(props);

        }
    }

    componentDidMount() {
        window.initMap = this.initMap;
        loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyAaEp9QYcNt6cq0NUJOk0UI8hhrfWTUfDY&libraries=places")
    }

    initMap() {
        var mapOptions = {
                center: {lat: 39.8282, lng: -98.5795},
                zoom: 4,
                styles: mapStyle
            }
        var map = new google.maps.Map(this.refs.map.getDOMNode(), mapOptions);
    }

    render() {

    }
}


class DirectionsForm extends React.Component {
    constructor(props) {
        super(props);
        this.autoCompleteProcessor = this.autoCompleteProcessor.bind(this);
        this.getDirections = this.getDirections.bind(this);
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

    getDirections(event) {
        event.preventDefault();
        let startCity = event.target[0].value.toLowerCase();
        let endCity = event.target[1].value.toLowerCase();

        function calcRoute() {
            var request = {
                origin: startCity,
                destination: endCity,
                travelMode: 'DRIVING'
            };

            directionsService.route(request, function(result, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(result);
                }
            });
        }
        calcRoute();
    }

    render() {
        return(
            <form className="form-inline" onSubmit={this.getDirections}>
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


function Test(props) {
    return(
        <h1>This is the test route</h1>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div>
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render(
    <ReactRouter.Router>
        <ReactRouter.Route path="/" component={App} >
            <ReactRouter.IndexRoute component={DirectionsForm} />
            <ReactRouter.Route path="/cities" component={Test} />
        </ReactRouter.Route>
    </ReactRouter.Router>,
    document.getElementById('directions-form')
)
