import React, {Component} from 'react';
import Scroll from 'react-scroll';
var scroll = Scroll.animateScroll;

class DisplayDirections extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    let instructions = "";
    const directions = this.props.directions;
    for (let i = 0; i < directions.length; i++) {
      const steps = directions[i].steps;
      for (let j = 0; j < steps.length; j++) {
        instructions = instructions + (steps[j].instructions) + "<br />";
      }
      if (i == 0) {
        instructions = instructions + "<b>BUY SOME DONUTS!!</b> <br/><br/>";
      }
    }
    return <div className="directions" dangerouslySetInnerHTML={{__html: instructions}} />;

  }
}
export default DisplayDirections;
