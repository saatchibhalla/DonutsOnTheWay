import React from 'react';
import ShopListItem from './shop_list_item';

const ShopList = (props) => {
  let i = 0
  const shopItems = props.shops.map((eachShopObject) => {
    return <ShopListItem
      selectedID= {props.selectedID}
      onShopSelect={props.onShopSelect}
      key={eachShopObject.place_id}
      id={i++}
      shop={eachShopObject} />
  });

  return (
    <ul className="list-group nav"> {shopItems} </ul>
  );
};

export default ShopList;
