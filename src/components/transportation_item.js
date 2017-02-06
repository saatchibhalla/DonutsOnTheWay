import React, {Component} from 'react';
import Scroll from 'react-scroll';
var scroll = Scroll.animateScroll;

class TransportationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  handleOnClick() {
    this.props.selectMethod(this.props.method);
  }
  render () {
    let className;
    const imageFilePath = `../../style/images/${this.props.method}.png`;
    const iconStyle = {
      height:"200px",
      width:"200px"
    };
    if (this.props.selected === this.props.method) {
      className = "transport-selected";
    }
    else {
      className = ""
    }
    scroll.scrollTo(1050);
    return (
      <div className="transportation">
        <input className={className} type="image" style={iconStyle} src={imageFilePath} onClick={(event) => this.handleOnClick()} />
      </div>
    );
  }
}

export default TransportationItem;
