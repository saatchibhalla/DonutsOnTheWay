import React, {Component} from 'react';
import GoogleMap from '../components/google_maps';
import { fetchLocation } from '../actions/get_location';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';

class UserLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donutShops: []
    };
    this.loadMap = this.loadMap.bind(this);
  }

  loadMap() {
    const lat = this.props.location.location.lat;
    const lon = this.props.location.location.lng;
    //TODO:const lat = 37.3512732
    //TODO:const lon = -122.0269045
    return <GoogleMap className="col-md-4" lon={lon} lat={lat} />;
  }

  render() {
     return (
       <div>
         <div className="theButton">
            <button className="btn" onClick={this.props.fetchLocation}> Find My Location </button>
            <p className="btn-heading"> Press this button to get your starting location. </p>
         </div>
         <div> {this.props.location.location? this.loadMap() : ""} </div>
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
