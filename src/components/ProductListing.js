import React from 'react'
import axios from 'axios'
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
        <li>{product.name}- {product.sku}</li>
        );
        return (
            <div>
                ProductListing
                <ul>{listItems}</ul>
            </div>
        )
    }
}
