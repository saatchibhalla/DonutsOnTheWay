import React, {Component} from 'react';
import GoogleMaps from '../components/google_maps';
import { fetchLocation } from '../actions/get_location';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';


class UserLocation extends Component {
  constructor(props) {
    super(props);
  }
  getLocation() {
    if (this.props.location.location) {
      const lat = this.props.location.location.lat;
      const lon = this.props.location.location.lng;
      return <GoogleMaps lon={lon} lat={lat} />
    }
    else {
      console.log("NAY");
    }
  }
  render() {
     return (
       <div>
          <button onClick={this.props.fetchLocation}> Find My Location </button>
          <div> {this.getLocation()} </div>
       </div>
      );
  }
}

function mapStateToProps({location}) {
  return { location };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchLocation }, dispatch);
};

export default connect( mapStateToProps, mapDispatchToProps)(UserLocation);
