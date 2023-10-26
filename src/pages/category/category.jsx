import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { instance } from "../../services/axios/instance";
import "./category.css";
import { CategoryProduct } from "../../components/category-product/category-product";

// import { FaStar } from "react-icons/fa6";

export const Category = () => {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const { categoryname } = useParams();

    // console.log(categoryname);
    useEffect(() => {
        document.title = `Amazon - ${categoryname}`;
        instance
            .get(`category/${categoryname}`)
            .then((res) => {
                console.log(res.data.products);
                setCategoryProducts(res.data.products);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [categoryname]);
    // console.log(categoryProducts);
    return (
        <section className='container-fluid'>
            <div className='row mt-2 mb-2'>
                <div className='col-lg-2 filter'></div>
                <div className='col-lg-10'>
                    <h3>{categoryname}</h3>
                    <div className='row mt-5'>
                        <div className='col-12'>
                            <p>
                                5-5 of over 5 results for &nbsp;
                                <span className='text-danger'>
                                    {categoryname}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        {categoryProducts.map((product, index) => (
                            // return (
                               <CategoryProduct
                                    key={index}
                                    productID={product.id}
                                    productTitle={product.title}
                                    productRating={product.rating}
                                    productDiscount={product.discountPercentage}
                                    productThumbnail={product.thumbnail}
                                    productPrice={product.price}
                                    productDescription={product.description} 
                                    /> 
                                 
                            )
                        )
                            
                        }         
                    </div>
                </div>
            </div>
        </section>
    );
};
