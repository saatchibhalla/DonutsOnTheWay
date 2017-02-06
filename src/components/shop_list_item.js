
import React, {Component} from 'react';

//Each Shop: title, icon, and rating. 
class ShopListItem extends Component {
  constructor(props) {
    super(props);
    var that = this;
    const shop = this.props.shop;
    var request = {
      placeId: shop.place_id
    };
    var service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails(request, function(place, status){
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        if (place.photos) {
          that.setState({
            imgURL: place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 100})
          });
        }
        else {
          that.setState({
            imgURL: shop.icon
          });
        }
      }
    });
    this.state = {
      imgURL: ""
    }
  }
  render() {
    const shop = this.props.shop;
    const id = this.props.id;
    const onShopSelect = this.props.onShopSelect;
    var isSelected = false;
    if (this.props.selectedID === this.props.id) {
      isSelected = true;
    }
    let className = "list-group-item " + isSelected;
    return (
      <li onClick={() => onShopSelect(id,shop)} className={className}>
         <img src={this.state.imgURL} />
         <div className="store-title"> {shop.name} </div>
         <div> {shop.rating? "Rating: " + shop.rating + "/5.0" : ""} </div>
      </li>
    );
  }
}

export default ShopListItem;
