/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactStarRating from "react-star-ratings-component";

export const ProductCard = (props) => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    return (
        <div
            className='col-lg-3 col-sm-6'
            onClick={() => {
                navigate(`/products/${props.productID}`);
            }}
        >
            <div className='card text-black my-3'>
                <a className='text-black text-decoration-none text-left category-product'>
                    <div className='img-container'>
                        <img
                            src={props.productThumbnail}
                            style={{
                                height: "160px",
                            }}
                            className='card-img-top d-block m-auto'
                            alt='...'
                        />
                    </div>
                    <div className='card-body'>
                        <h5 className='card-title category-product-title '>
                            {props.productTitle}
                        </h5>
                        <div className='product-rating'>
                            {/* {t("categoryPage.part1")}: &nbsp; */}
                            <span>
                                {props.productRating}
                                <ReactStarRating
                                    numberOfStar={5}
                                    numberOfSelectedStar={props.productRating}
                                    colorFilledStar='#ff9900'
                                    colorEmptyStar='#eee'
                                    starSize='25px'
                                    spaceBetweenStar='0px'
                                />
                                {/* <strong>{props.productRating}</strong> */}
                            </span>
                        </div>
                        <p className='price mt-2 d-inline-block'>
                            <sup> $ </sup>
                            {props.productPrice}
                            <sup> 00</sup>
                            <p
                                className='fw-bold'
                                style={{
                                    color: "red",
                                }}
                            >
                                -{props.productDiscount}
                                &nbsp;%
                            </p>
                        </p>
                        <p className='fifty-chars'>
                            {props.productDescription}
                        </p>
                        <p> {props.productBrand}</p>
                        <Link
                            className='btn btn-success text-decoration-none'
                            to={`/products//${props.id}`}
                        >
                            more Details
                        </Link>
                        {/* <button onClick={()=>handelAdd(props)} >jjj</button> */}
                    </div>
                </a>
            </div>
        </div>
    );
};
