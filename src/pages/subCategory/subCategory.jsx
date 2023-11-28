/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../services/axios/instance";
import "./subCategory.css";
import { ProductCard } from "../../components/category-product/productCard";
import { authContext } from "../../context/authcontex";
import ReactPaginate from "react-paginate";


export const SubCategory = () => {
    const [SubCategoryProducts, setSubCategoryProducts] = useState([]);
    const { lang, setLang } = useContext(authContext);

    let { SubCategoryID } = useParams();
   
    const navigate = useNavigate();
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [brand, setBrand] = useState([]);
    const [sorting, setSorting] = useState("");
    const [brandCollection, setBrandCollection] = useState([]);
    const [ArbrandCollection, setArBrandCollection] = useState([]);
    const [subSubCategories,setSubSubcategories] = useState ([])
    const [pagination, setPagination] = useState({});
    const [productlength, setProductLength] = useState("");
    const [currentPage, setCurrentPage] = useState("1");



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
        // document.title = `Amazon - ${categoryName}`;
        window.scrollTo({ top: 0, behavior: "smooth" });
        fetchProducts();
       
    // }, [SubCategoryID, navigate, categoryName]);
}, [SubCategoryID, navigate,currentPage]);

    let fetchProducts = async (params) => {
        try {
          const res = await instance.get(
            `/products/subCategoryPrd/${SubCategoryID}?page=${currentPage}`,
            {
              params: {
                ...params,
              },
            }
          );
          setSubCategoryProducts(res.data.data);
          setPagination(res.data.pagination);
          setProductLength(res.data.results);


          
        } catch (error) {
          console.error(error);
        //   navigate("/");
        }
      };

      useEffect(() => {
        generateBrands();
      }, [SubCategoryProducts]);

      const generateBrands = () => {
        // const uniqueBrands = Array.from(
        //   // new Set(categoryProducts.map((product) => product.brand))
        //   new Set(categoryProducts.map((product) => lang === "en" ? product.en?.brand:product.ar?.brand))
        // );
        // setBrandCollection(uniqueBrands);


          if (lang==="en"){
            const enBrands = Array.from(
              new Set(subProdBrand.map((product) => product.en.brand))
            );
            setBrandCollection(enBrands);
          }
          else if (lang==="ar"){
            const arBrands = Array.from(
              new Set(subProdBrand.map((product)=>product.ar.brand))
            );
            setArBrandCollection(arBrands);
          }
        }

        const [subProdBrand, setSubProdBrand] = useState([]);
        useEffect(() => {
            instance.get(`/products/subCategoryPrd/${SubCategoryID}`).then((res) => {
                // console.log(res);
                setSubProdBrand(res.data.data);
            });
          }, [subProdBrand]);

        const handlePriceChange = (event) => {
            setPrice(event.target.value);
        }

        
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleBrandChange = (event) => {
    // setBrand(event.target.value);
    // let value = (lang ==="en" ? event.target.value : event.target.value)
    let value = event.target.value;
    if (value === "") {
      setBrand([]);
    } else if (event.target.checked === true) {
      setBrand([...brand, value]);
    } else if (event.target.checked === false) {
      const newArr = brand.filter((e) => e !== value);
      // setBrand(newArr);
      // setBrand([...brand,newArr]);
      setBrand([...newArr]);
    }
  };

  const handleSorting = (event) => {
    setSorting(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    applyFilters();
  }, [price, rating, brand,sorting]);

  let params = [];
  const applyFilters = () => {
    // let params = [];
    if (price) {
      params.price = price;
    }
    if (rating) {

      params.rating = rating;
    }
    if (brand) {
      // lang === "en"? params.brand =brand: params.brand =brand
      // params.brand = brand;
      params[lang === "en" ? "en.brand" : "ar.brand"] = brand;

    }
    if (sorting) {
      params.sort = sorting;
    }

    fetchProducts(params);
  };



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

useEffect(()=>{
    instance.get(`/subcategory/sub/subSub/${SubCategoryID}`)
    .then((res)=>{
setSubSubcategories(res.data.data)
console.log(res.data.data);
    })
    .catch((err) => {
        console.log(err);
    });
},[])

const handlePageClick=(data)=>{
  console.log(data.selected+1);
  setCurrentPage(data.selected+1)
}

    return (
        // <></>
        <section className='container-fluid'>
            <div className="row  mt-1 py-1 rounded border border-light-subtle shadow">
        <div className="col-sm-10 ">
          <p className="fs-6 ms-5 pt-2">
            {pagination.skip + 1} -
            {pagination.currentPage == pagination.numberOfPages
              ? productlength
              : pagination.limit + pagination.skip}
            {/* {pagination.limit + pagination.skip} */} of over {productlength}{" "}
            results
          </p>
        </div>
        <div className="col-sm-2 pt-1 me-0 pe-0 ">
          <div className="dropdown">
            <button
              className="p-1 px-3 btn btn-light btn-outline-secondary shadow-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sort By
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  type="button"
                  className="btn btn-light"
                  value={"price"}
                  onClick={() => handleSorting(event)}
                >
                  price: Low to High
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-light"
                  value="-price"
                  onClick={() => handleSorting(event)}
                >
                  price: High to Low
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-light"
                  value={"-rating"}
                  onClick={() => handleSorting(event)}
                >
                  Avg. Customer Reviews
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-light"
                  value={"-sold"}
                  onClick={() => handleSorting(event)}
                >
                  Best Seller
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
            <div className='row mt-2 mb-2'>
                <div className='col-lg-2 filter'>
                   {(lang === "en")?
                   <div>
                   {/* <h3>{categoryName} </h3> */}
                 
                   {/* {subSubCategories.map((sub) => (
                                <a
                                    key={sub._id}
                                    onClick={() =>
                                        navigate(
                                            `/products/SubSubCategory/${sub._id}`
                                            // , {params:sub.en.name}
                                        )
                                    }
                                >
                                    <p className='p-0 my-0 ms-4 text-truncate fs-6'>
                                        {sub.en.name}
                                    </p>
                                </a>
                            ))} */}


<h4 className="mt-3">Rating</h4>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value=""
onChange={handleRatingChange}
/>
All Ratings
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value="5"
onChange={handleRatingChange}
/>
Equal to 5 stars
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value="4"
onChange={handleRatingChange}
/>
Equal to 4 stars
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value="3"
onChange={handleRatingChange}
/>
Equal to 3 stars
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value="2"
onChange={handleRatingChange}
/>
Equal to 2 stars
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value="1"
onChange={handleRatingChange}
/>
Equal to 1 star
</label>

<div className="mt-3">
<h4>Price</h4>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value=""
onChange={handlePriceChange}
/>
Any price
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value="25"
onChange={handlePriceChange}
/>
Equal to $25
</label>

<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value="50"
onChange={handlePriceChange}
/>
Equal to $50
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value="100"
onChange={handlePriceChange}
/>
Equal to $100
</label>

<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value="200"
onChange={handlePriceChange}
/>
Equal to $200
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value="300"
onChange={handlePriceChange}
/>
Equal to $300
</label><br />

<h4>Brands</h4>
{brandCollection.map((bd) => (
<label key={bd} className="d-block fs-6 ms-2">
<input
  type="checkbox"
  value={bd}
  onChange={handleBrandChange}
  // checked={brand.includes(bd)}
/>
{bd} 
</label>
))}
</div>
</div>
 : 
<div>
{/* <h3>{categoryName}</h3> */}
{/* {subSubCategories.map((sub) => (
                                <a
                                    key={sub._id}
                                    onClick={() =>
                                        navigate(
                                            `/products/SubSubCategory/${sub._id}`
                                            // , {params:sub.ar.name}
                                        )
                                    }
                                >
                                    <p className='p-0 my-0 ms-4 text-truncate fs-6'>
                                        {sub.ar.name}
                                    </p>
                                </a>
                            ))} */}

<h4 className="mt-3">التقييم</h4>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value=""
onChange={handleRatingChange}
/>
كل التقييمات
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value="5"
onChange={handleRatingChange}
/>
5 نجوم
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value="4"
onChange={handleRatingChange}
/>
4 نجوم
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value="3"
onChange={handleRatingChange}
/>
3 نجوم
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value="2"
onChange={handleRatingChange}
/>
نجمتين
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="rating"
value="1"
onChange={handleRatingChange}
/>
نجمة
</label>

<div className="mt-3">
<h4>السعر</h4>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value=""
onChange={handlePriceChange}
/>
كل الأسعار
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value="25"
onChange={handlePriceChange}
/>
25$
</label>

<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value="50"
onChange={handlePriceChange}
/>
50$
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value="100"
onChange={handlePriceChange}
/>
100$
</label>

<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value="200"
onChange={handlePriceChange}
/>
200$
</label>
<label className="d-block fs-6 ms-2">
<input
type="radio"
name="price"
value="300"
onChange={handlePriceChange}
/>
300$
</label>

<h4>العلامات التجارية</h4>
{ArbrandCollection.map((bd) => (
<label key={bd} className="d-block fs-6 ms-2">
<input
  type="checkbox"
  value={bd}
  onChange={handleBrandChange}
  // checked={brand.includes(bd)}
/>
{bd} 
</label>
))}
</div>
</div>

                   }



                </div>
                <div className='col-lg-10'>
                    {/* <h3>{categoryName}</h3> */}
                    <div className='row mt-5'>
                        <div className='col-12'>
                            <p>
                                5-5 of over {SubCategoryProducts.length} results for &nbsp;
                                <span className='text-danger'>
                                    {/* {categoryName} */}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='row'>
                        {SubCategoryProducts.map((product, index) => (
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
                            />
                        ))}
                    </div>
                </div>
            </div>

            <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        marginPagesDisplayed={2}
        pageRangeDisplayed={4}
        pageCount={pagination.numberOfPages}
        previousLabel="previous"
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link "
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"

        //   renderOnZeroPageCount={null}
      />
        </section>
    );
};
