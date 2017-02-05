import React, {Component} from 'react';
import ShopList from '../components/shop_list';

const DonutShops = (props) => {
  return (
    <div>
      <ShopList onShopSelect={props.onShopSelect}
       shops={props.donutShops} 
       selectedID= {props.selectedID}/>
    </div>
  );
};
export default DonutShops;
