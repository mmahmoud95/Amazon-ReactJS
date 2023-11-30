/* eslint-disable react/prop-types */
import {useState, useEffect} from "react";
import {instance} from "../../services/axios/instance";
import {useNavigate} from "react-router-dom";
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
    }, []);

	const navigate = useNavigate();

    return (
        <>
            <div className='row mx-2'>
                {products.map((prd) => (
                    <div
                        className='col-6 col-sm-4 col-md-3 col-lg-2 product-details'
                        key={prd._id}
                        onClick={() => {
                            navigate(`/products/${prd._id}`);
                        }}
                    >
                        <img
                            className='my-3 px-1'
                            src={prd.thumbnail}
                            alt=''
                            style={{ height: "13rem" , width:"11rem"}}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}
