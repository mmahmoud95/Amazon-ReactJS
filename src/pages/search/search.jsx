import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../services/axios/instance";
import { ProductCard } from "../../components/category-product/productCard";

export const Search = () => {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [notFound, setNotFound] = useState("");
    const { search } = useLocation();
    const result = search.split("?");
    const navigate = useNavigate();
    useEffect(() => {
        // document.title = `Amazon - ${categoryName}`;
        window.scrollTo({ top: 0, behavior: "smooth" });
        instance
            .get(`products/result?search=${result[1]}`)
            .then((res) => {
                // console.log(res.data.products);
                // console.log(rasult[1]);
                if (res.data.data.length > 0) {
                    setNotFound("");
                    setCategoryProducts(res.data.data);
                    // console.log(res.data.data);
                } else {
                    setCategoryProducts([]);
                    setNotFound(`product not found  search again`);
                    // console.log(res.data.message);
                }

                // console.log(res.data.data);
            })
            .catch((err) => {
                navigate("/");
            });
    }, [result[1]]);
    // console.log(categoryname);
    // const [catogories, setCatogories] = useState([]);
    // useEffect(() => {
    //     instance
    //         .get("category")
    //         .then((res) => {
    //             // console.log(res.data);
    //             setCatogories(res.data);
    //             // setCategoryProducts(res.data.data);
    //             // console.log(res.data.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    // var categoryName;
    // for (const category in catogories) {
    //     // console.log(categoriesArr[category].id, categoryID);
    //     if (catogories[category]._id === categoryID) {
    //         categoryName = catogories[category].name;
    //     }
    // }
    // console.log(categoryProducts);
    return (
        // <></>
        <section className='container-fluid'>
            <div className='row mt-2 mb-2'>
                <div className='col-lg-2 filter'></div>
                <div className='col-lg-10'>
                    {/* <h3>{categoryName}</h3> */}
                    <div className='row mt-5'>
                        <div className='col-12'>
                            <p>
                                5-5 of over 5 results for &nbsp;
                                <span className='text-danger'>
                                    {/* {categoryName} */}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        {categoryProducts?.map((product, index) => (
                            // return (
                            <ProductCard
                                key={index}
                                productID={product._id}
                                productTitle={product.title}
                                productRating={product.rating}
                                productDiscount={product.discountPercentage}
                                productThumbnail={product.thumbnail}
                                productPrice={product.price}
                                productDescription={product.description}
                            />
                        ))}
                        {<h1>{notFound}</h1>}
                    </div>
                </div>
            </div>
        </section>
    );
};
