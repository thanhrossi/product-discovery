import React from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export default class ProductListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };

    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = async  () => {
        try {
            const response = await axios.get('https://listing-stg.services.teko.vn/api/search/?saleCategories=613&channel=pv_online&terminal=phongvu&saleStatuses=hang_ban,hang_dat_truoc,hang_sap_het,hang_moi,hang_trung_bay,hang_thanh_ly&_sort=saleStatuses||hang_ban|hang_dat_truoc|hang_sap_het|hang_moi||hang_trung_bay|hang_thanh_ly||ngung_kinh_doanh&_order=asc&_page=2&_limit=20&publishStatus=true');
            console.log(response.data.result.products);
            this.setState({
                products: response.data.result.products
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { products } = this.state;
        const listItems = products.map((product) =>
        <div class="product">
            <div className="product-avatar" >
                <img src={product.images[0].url} alt={product.name}/>
            </div>
            <div className="product-info">
                <div className="product-name">
                {product.name}
                </div>
                <div className="product-sell-price">
                    {product.price.sellPrice.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND'
                    })}
                </div>
                <div className="product-old-price-wrap">
                    <div className="product-old-price">
                        {product.price.supplierSalePrice.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND'
                    })}
                    </div> 
                    <span className="sale-percent">-20%</span>
                </div>
                {/* {
                    product.price.supplierSalePrice > product.price.sellPrice ?
                    <div className="product-old-price">
                        {product.price.supplierSalePrice}
                        <span className="sale-percent">20%</span>
                    </div> :
                    null
                } */}
                
            </div>

            
        </div>
        );
        return (
            <div>
                <header>
                    <button className="back">Back</button>
                    <input type="text" placeholder="Nhập tên, mã sản phẩm" />
                </header>
                <div className="product-wrapper">{listItems}</div>
            </div>
        )
    }
}
