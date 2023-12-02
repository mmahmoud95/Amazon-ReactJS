// /* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import {useState, useEffect,useContext} from "react";
import {instance} from "../../services/axios/instance";
import {useNavigate} from "react-router-dom";
import {Stars} from '../../components/stars/stars'
import {authContext} from "../../context/authcontex";
import "./home.css";

export default function RatingSliderItem(props) {
    const {lang} = useContext(authContext);

	const [products, setProducts] = useState([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
                            style={{ height: "13rem" , width:"12rem"}}
                        />
                        <div className="card-body">
                                        <h5 className="card-title ms-3 text-truncate">
                                            {lang==="en"?prd.en?.title:prd.ar?.title}
                                        </h5>
                       <div className="ms-2">
                       <Stars 
                        starSize={20}
                        productRating={Math.round(
                            prd.rating
                        )}/>
                       </div>
                       <div className="my-2 ms-2">
                       <span className="badge text-bg-dark text-warning mx-1">{prd.discountPercentage} % off</span>
                                        {/* <span className="text-warning">limited time deal</span> */}
                                        <div className="ms-2">
                                       <span className="ms- ">Only</span>
                                       <span className="m-1  mt-1 text-danger fw-bold">{prd.price}</span>
                                        <span>EGP</span>
                                        </div>
                                       
                       </div>
                    </div>
                    </div>
                ))}
                
            </div>
        </>
    );
}
