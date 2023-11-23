/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../services/axios/instance";
import "./category.css";
import { ProductCard } from "../../components/category-product/productCard";
import { authContext } from "../../context/authcontex";
import { Button } from "bootstrap";

export const Category = () => {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const { lang, setLang } = useContext(authContext);

    let { categoryID } = useParams();

    const navigate = useNavigate();
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [brand, setBrand] = useState([]);
    // const [brandCollection, setBrandCollection] = useState([]);
    // const [ArbrandCollection, setArBrandCollection] = useState([]);
    const [subCategories, setSubcategories] = useState([]);

    // useEffect(() => {
    //     document.title = `Amazon - ${categoryName}`;
    //     window.scrollTo({ top: 0, behavior: "smooth" });
    //     instance
    //         .get(`products/category/${categoryID}`)
    //         .then((res) => {
    //             // console.log(res.data.products);
    //             setCategoryProducts(res.data.data);
    //             // console.log(res.data.data);
    //         })
    //         .catch((err) => {
    //             navigate("/");
    //         });
    // }, [categoryID, navigate, categoryName]);
    // console.log(categoryname);

    useEffect(() => {
        document.title = `Amazon`;
        window.scrollTo({ top: 0, behavior: "smooth" });
        fetchProducts();
    }, [categoryID, navigate]);

    let fetchProducts = async (params) => {
        // console.log(params);
        try {
            await instance
                .get(`/products/categoryPrd/${categoryID}`, {
                    params: {
                        ...params,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    setCategoryProducts(res.data.data);
                });
        } catch (error) {
            // console.error(error);
            setCategoryProducts([]);
        }
    };

    useEffect(() => {
        instance.get(`/products/categoryPrd/${categoryID}`).then((res) => {
            // console.log(res);
            generateBrands(res.data.data);
        });
    }, [categoryID]);
    const [enBrands, setEnBrands] = useState([]);
    const [arBrands, setArBrands] = useState([]);

    const generateBrands = (data) => {
        const enBrandList = Array.from(
            new Set(data.map((product) => product.en.brand))
        );
        const arBrandList = Array.from(
            new Set(data.map((product) => product.ar.brand))
        );
        setEnBrands(enBrandList);
        setArBrands(arBrandList);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleBrandChange = (event) => {
        let value = event.target.value;
        if (value === "") {
            setBrand("");
        } else if (event.target.checked === true) {
            setBrand([...brand, value]);
            // console.log(brand);
        } else if (event.target.checked === false) {
            const newArr = brand.filter((e) => e !== value);
            setBrand([...newArr]);
            // console.log(brand);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [price, rating, brand]);

    let params = [];
    const applyFilters = () => {
        if (price) {
            params["price[gte]"] = price;
        }
        if (rating) {
            params.rating = rating;
        }
        if (brand.length > 0) {
            params[lang === "en" ? "en.brand" : "ar.brand"] = brand;
        }

        fetchProducts(params);
    };

    const [catogories, setCatogories] = useState([]);
    useEffect(() => {
        instance
            .get("category")
            .then((res) => {
                setCatogories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    var categoryName;
    for (const category in catogories) {
        // console.log(categoriesArr[category].id, categoryID);
        if (catogories[category]._id === categoryID) {
            categoryName = catogories[category].name;
        }
    }
    // console.log(categoryProducts);

    useEffect(() => {
        instance
            .get(`/subcategory/subs/${categoryID}`)
            .then((res) => {
                setSubcategories(res.data.data);
                // console.log(res.data.data);
            })
            .catch((err) => {
                // console.log(err);
            });
    }, [categoryID, navigate]);

    return (
        // <></>
        <section className='container-fluid'>
            <div className='row mt-2 mb-2'>
                <div className='col-lg-2 filter'>
                    {lang === "en" ? (
                        <div>
                            {subCategories.map((sub) => (
                                <a
                                    key={sub._id}
                                    onClick={() =>
                                        navigate(
                                            `/products/SubCategory/${sub._id}`
                                        )
                                    }
                                >
                                    <p className='p-0 my-0 ms-4 text-truncate fs-6'>
                                        {sub.en.name}
                                    </p>
                                </a>
                            ))}

                            <h4 className='mt-3'>Rating</h4>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value=''
                                    onChange={handleRatingChange}
                                />
                                All Ratings
                            </label>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value={5}
                                    onChange={handleRatingChange}
                                />
                                Equal to 5 stars
                            </label>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value={4}
                                    onChange={handleRatingChange}
                                />
                                Equal to 4 stars
                            </label>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value={3}
                                    onChange={handleRatingChange}
                                />
                                Equal to 3 stars
                            </label>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value={2}
                                    onChange={handleRatingChange}
                                />
                                Equal to 2 stars
                            </label>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value={1}
                                    onChange={handleRatingChange}
                                />
                                Equal to 1 star
                            </label>

                            <div className='mt-3'>
                                <h4>Price</h4>
                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value=''
                                        onChange={handlePriceChange}
                                    />
                                    Any price
                                </label>
                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value='25'
                                        onChange={handlePriceChange}
                                    />
                                    Equal to $25
                                </label>

                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value='50'
                                        onChange={handlePriceChange}
                                    />
                                    Equal to $50
                                </label>
                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value='100'
                                        onChange={handlePriceChange}
                                    />
                                    Equal to $100
                                </label>

                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value='200'
                                        onChange={handlePriceChange}
                                    />
                                    Equal to $200
                                </label>
                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value='300'
                                        onChange={handlePriceChange}
                                    />
                                    Equal to $300
                                </label>
                                <br />

                                <h4>Brands</h4>
                                {enBrands?.map((bd) => (
                                    <label
                                        key={bd}
                                        className='d-block fs-6 ms-2'
                                    >
                                        <input
                                            type='checkbox'
                                            value={bd}
                                            onChange={(ev) =>
                                                handleBrandChange(ev)
                                            }
                                            // checked={brand.includes(bd)}
                                        />
                                        {bd}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3>{categoryName}</h3>

                            {subCategories.map((sub) => (
                                <a
                                    key={sub._id}
                                    onClick={() =>
                                        navigate(
                                            `/products/SubCategory/${sub._id}`
                                        )
                                    }
                                >
                                    <p className='p-0 my-0 ms-4 text-truncate fs-6'>
                                        {sub.ar.name}
                                    </p>
                                </a>
                            ))}

                            <h4 className='mt-3'>التقييم</h4>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value=''
                                    onChange={handleRatingChange}
                                />
                                كل التقييمات
                            </label>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value='5'
                                    onChange={handleRatingChange}
                                />
                                5 نجوم
                            </label>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value='4'
                                    onChange={handleRatingChange}
                                />
                                4 نجوم
                            </label>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value='3'
                                    onChange={handleRatingChange}
                                />
                                3 نجوم
                            </label>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value='2'
                                    onChange={handleRatingChange}
                                />
                                نجمتين
                            </label>
                            <label className='d-block fs-6 ms-2'>
                                <input
                                    type='radio'
                                    name='rating'
                                    value='1'
                                    onChange={handleRatingChange}
                                />
                                نجمة
                            </label>

                            <div className='mt-3'>
                                <h4>السعر</h4>
                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value=''
                                        onChange={handlePriceChange}
                                    />
                                    كل الأسعار
                                </label>
                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value='25'
                                        onChange={handlePriceChange}
                                    />
                                    25$
                                </label>

                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value='50'
                                        onChange={handlePriceChange}
                                    />
                                    50$
                                </label>
                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value='100'
                                        onChange={handlePriceChange}
                                    />
                                    100$
                                </label>

                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value='200'
                                        onChange={handlePriceChange}
                                    />
                                    200$
                                </label>
                                <label className='d-block fs-6 ms-2'>
                                    <input
                                        type='radio'
                                        name='price'
                                        value='300'
                                        onChange={handlePriceChange}
                                    />
                                    300$
                                </label>

                                <h4>العلامات التجارية</h4>
                                {arBrands?.map((bd) => (
                                    <label
                                        key={bd}
                                        className='d-block fs-6 ms-2'
                                    >
                                        <input
                                            type='checkbox'
                                            value={bd}
                                            onChange={(ev) =>
                                                handleBrandChange(ev)
                                            }
                                            // checked={brand.includes(bd)}
                                        />
                                        {bd}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className='col-lg-10'>
                    <h3>{categoryName}</h3>
                    <div className='row mt-5'>
                        <div className='col-12'>
                            <p>
                                5-5 of over {categoryProducts.length} results
                                for {categoryName}
                                &nbsp;
                                <span className='text-danger'>
                                    {categoryName}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        {categoryProducts.length > 0 ? (
                            categoryProducts.map((product, index) => (
                                // return (
                                <ProductCard
                                    key={index}
                                    productID={product._id}
                                    productTitle={
                                        lang === "en"
                                            ? product.en?.title
                                            : product.ar?.title
                                    }
                                    productRating={product.rating}
                                    productDiscount={product.discountPercentage}
                                    productThumbnail={product.thumbnail}
                                    productPrice={product.price}
                                    productDescription={
                                        lang === "en"
                                            ? product.en?.description
                                            : product.ar?.description
                                    }
                                    productBrand={
                                        lang === "en"
                                            ? product.en?.brand
                                            : product.ar?.brand
                                    }
                                />
                            ))
                        ) : (
                            <h5>No Products Match your choice</h5>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
