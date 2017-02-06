import React, {Component} from 'react';
import DonutShops from './donut_shops';
import TransportationList from './transportation';
import DisplayDirections from './display_directions';
import Scroll from 'react-scroll';
var scroll = Scroll.animateScroll;

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donutShops: [],
      selectedShopID: "",
      selectedShop: null,
      selectedTransport: "",
      directions: null
    };
    this.callback = this.callback.bind(this);
    this.onShopSelect = this.onShopSelect.bind(this);
    this.onTransportSelect = this.onTransportSelect.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }
  componentDidMount() {

    setTimeout(function(){ scroll.scrollTo(250) }, 500);
    const {lat,lon} = this.props;
    const currLocation = new google.maps.LatLng(lat,lon);
    const request = {
      location: currLocation,
      query: 'donut shop',
      rankBy: google.maps.places.RankBy.DISTANCE
    };

    var service = new google.maps.places.PlacesService(this.refs.map);
    service.textSearch(request, this.callback);
  }
  callback(results, status) {
    var service = new google.maps.places.PlacesService(this.refs.map);
    var infoWindow = new google.maps.InfoWindow();

    var map = new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: { lat: this.props.lat, lng: this.props.lon }
    });
   //5 closest results
   results = results.slice(0,5);
   if (status == google.maps.places.PlacesServiceStatus.OK) {
     this.setState({
       donutShops: results
     });
     for (var i = 0, result; result = results[i]; i++) {
        addMarker(result);
      }
   }
   function addMarker(place) {
     var marker = new google.maps.Marker({
       map: map,
       position: place.geometry.location,
       icon: {
         url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
         anchor: new google.maps.Point(10, 10),
         scaledSize: new google.maps.Size(10, 17)
       }
     });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, marker);
    });
  }

   var infowindowCurrLocation = new google.maps.InfoWindow({
     content: "Your Location"
   });
   var infowindowDestination = new google.maps.InfoWindow({
     content: "ClickTime"
   });
   //user location marker
   var marker = new google.maps.Marker({
     position: {lat:this.props.lat, lng:this.props.lon},
     map: map
   });
   var destinationMarker = new google.maps.Marker({
     position: {lat:37.7855, lng:-122.3971},
     icon: {
       url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
     },
     map: map
   });
   marker.addListener('click', function() {
     infowindowCurrLocation.open(map, marker);
   });
   destinationMarker.addListener('click', function() {
     infowindowDestination.open(map, destinationMarker);
   });
 }
  onShopSelect(selectedShopID, selectedShop) {
    this.setState({selectedShop, selectedShopID});

  }
  onTransportSelect(selectedTransport) {
    this.setState({selectedTransport});
  }
  getDirections() {
    var that = this;
    if (!(this.state.selectedTransport && this.state.selectedShop)) {
      alert("Please choose a donut shop to stop at, and a method of transportation before attempting to get directions");
    }
    else {
      var directionsService = new google.maps.DirectionsService;

      const {lat,lon} = this.props;
      const origin = new google.maps.LatLng(lat,lon);
      const mode = this.state.selectedTransport;
      const donutShop = this.state.selectedShop.geometry.location;
      const destination = "282 2nd Street 4th floor, San Francisco, CA 94105";
      if (mode === "TRANSIT") {
        let fullResponse;
        let request1 = {
          origin: origin,
          destination: donutShop,
          travelMode: mode
        };
        let request2 = {
          origin: donutShop,
          destination: destination,
          travelMode: mode
        };
        directionsService.route(request1, function(response1, status) {
          if (status == "OK") {
            directionsService.route(request2, function(response2, status) {
              if (status == "OK") {
                that.setState({
                  directions: [response1.routes[0].legs[0], response2.routes[0].legs[0]]
                });
              }
            });
          }
        });
      }
      else {
        let request = {
          origin: origin,
          destination: destination,
          travelMode: mode,
          waypoints: [{location: donutShop, stopover: true}]
        }
        directionsService.route(request, function(response, status) {
          if (status == "OK") {
            that.setState({
              directions: response.routes[0].legs
            });
          }
        });
      }
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <h4 className="loc-title"> Please select which donut shop is most convenient for you from the list below,
          and I will direct you through it. </h4>
          <div className="loc-page">
            <div className="location-map">
              <div className="theMap" ref="map" />
            </div>
            <div className="location-shops">
              <DonutShops
                selectedID={this.state.selectedShopID}
                onShopSelect={this.onShopSelect}
                donutShops={this.state.donutShops}/>
            </div>
          </div>
        </div>
        <div>{this.state.selectedShop? <TransportationList onTransportSelect={this.onTransportSelect} />: <div style={{paddingTop:'20%'}} /> } </div>
        <div className="theButton">
          {this.state.selectedShop? <button className="btn" onClick={this.getDirections}> Get Directions </button>: "" }
        </div>
        <div>
          <div> {this.state.directions? <DisplayDirections directions={this.state.directions}/>: ""} </div>
        </div>
      </div>
    );
  }
}

export default GoogleMap;
