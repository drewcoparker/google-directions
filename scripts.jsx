
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
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

class DirectionsForm extends React.Component {
    constructor(props) {
        super(props);
        // this.zoomToCity = this.zoomToCity.bind(this);
        this.getDirections = this.getDirections.bind(this);
    }

    // zoomToCity() {
    //     var zoomCity =
    //     var service = new google.maps.places.PlacesService(map);
    //     service.nearbySearch({
    //         location: zoomCity,
    //         radius: 500,
    //         type: ['store']
    //     }, function(results, status) {
    //         console.log(results);
    //     })
    // }

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
                        className="typehead form-control"
                        placeholder="Start location"
                        onBlur={this.zoomToCity}
                    />
                </div>
                <div className="form-group">
                    <input
                        id="end-location"
                        type="text"
                        className="typehead form-control"
                        placeholder="Destination"
                        onBlur={this.zoomToCity}
                    />
                </div>
                <button type="submit" className="btn btn-info">Get directions</button>
            </form>
        )
    }
}


ReactDOM.render(
    <DirectionsForm />,
    document.getElementById('directions-form')
)
