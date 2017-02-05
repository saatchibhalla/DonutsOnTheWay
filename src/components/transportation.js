import React, {Component} from 'react';
import TransportationItem from './transportation_item';

class TransportationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
    this.selectMethod = this.selectMethod.bind(this);
  }

  selectMethod(selection) {
    this.setState({selected: selection });
    this.props.onTransportSelect(selection);
  }

  render() {
    return (
        <div className="transport-group">
          <h4 className="loc-title"> Please select your method of transportation. </h4>
          <div className="loc-page">
            <TransportationItem selected={this.state.selected} method="BICYCLING" selectMethod={this.selectMethod} />
            <TransportationItem selected={this.state.selected} method="WALKING" selectMethod={this.selectMethod} />
            <TransportationItem selected={this.state.selected} method="TRANSIT" selectMethod={this.selectMethod} />
          </div>
        </div>
    );
  }
}

export default TransportationList;
