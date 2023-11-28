/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { instance } from "../../services/axios/instance";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function CarouselItem(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        instance
            .get(`${props.url}?limit=${props.limit}&skip=${props.skip}`)
            // .get(`/products/categoryPrd/65527ac3376a52ea210d9706?limit=${props.limit}&skip=${props.skip}`)
            .then((res) => {
                console.log(res.data.data);
                setProducts(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props]);

    const navigate = useNavigate();

    return (
        <>
            <div className='row'>
                {products.map((prd) => (
                    <div
                        className='col-6 col-sm-4 col-md-3 col-lg-2 product-details'
                        key={prd._id}
                        onClick={() => {
                            navigate(`/products/${prd._id}`);
                        }}
                    >
                        <img
                            className='m-3'
                            src={prd.images[0]}
                            alt=''
                            style={{ height: "12rem" }}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
