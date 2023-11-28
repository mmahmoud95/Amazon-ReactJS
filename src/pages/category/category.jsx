/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../services/axios/instance";
import "./category.css";
import { ProductCard } from "../../components/category-product/productCard";
import { authContext } from "../../context/authcontex";
import Spinner from "react-bootstrap/Spinner";
// import { PaginationFilter } from "../../components/PaginationFilter/PaginationFilter";
import ReactPaginate from "react-paginate";

export const Category = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { lang } = useContext(authContext);
  const [loading, setLoading] = useState(true);
  let { categoryID } = useParams();

  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [brand, setBrand] = useState([]);
  const [sorting, setSorting] = useState("");
  // const [brandCollection, setBrandCollection] = useState([]);
  // const [ArbrandCollection, setArBrandCollection] = useState([]);
  const [subCategories, setSubcategories] = useState([]);
  const [productlength, setProductLength] = useState("");
  const [pagination, setPagination] = useState({});
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
    document.title = `Amazon`;
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProducts();
  }, [categoryID, navigate,currentPage]);

  let fetchProducts = async (params) => {
    setLoading(true);
    // console.log(params);
    try {
      await instance
        .get(`/products/categoryPrd/${categoryID}?page=${currentPage}`, {
          params: {
            ...params,
          },
        })
        .then((res) => {
          // console.log(res);
          setLoading(false);
          setCategoryProducts(res.data.data);
          console.log(res.data.results);
          setProductLength(res.data.results);
          setPagination(res.data.pagination);
          console.log(res.data.pagination);
        });
    } catch (error) {
      setLoading(false);
      // console.error(error);
      setCategoryProducts([]);
    }
  };
  const [loadingBrands, setLoadingBrands] = useState(true);
  useEffect(() => {
    setLoadingBrands(true);
    instance.get(`/products/categoryPrd/${categoryID}`).then((res) => {
      // console.log(res);
      generateBrands(res.data.data);
      setLoadingBrands(false);
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
    } else if (event.target.checked === false) {
      const newArr = brand.filter((e) => e !== value);
      setBrand([...newArr]);
    }
  };

  const handleSorting = (event) => {
    setSorting(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    applyFilters();
  }, [price, rating, brand, sorting,currentPage]);

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
    if (sorting) {
      params.sort = sorting;
    }

    fetchProducts(params);
  };

  const [catogories, setCatogories] = useState([]);
  useEffect(() => {
    instance
      .get("category/")
      .then((res) => {
        setCatogories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryID]);

  var categoryName;
  for (const category in catogories) {
    // console.log(categoriesArr[category].id, categoryID);
    if (catogories[category]._id === categoryID) {
      // categoryName = catogories[category].name;
     categoryName=(lang === "en" ? catogories[category].en?.name : catogories[category].ar?.name)
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
        console.log(err);
      });
  }, [categoryID, navigate]);

  const handlePageClick=(data)=>{
    console.log(data.selected+1);
    setCurrentPage(data.selected+1)
}

  return (
    // <></>
    <section className="container-fluid">
      <div className="row  mt-1 py-1 rounded border border-light-subtle shadow">
        <div className="col-sm-10 ">
          <p className="fs-6 ms-5 pt-2">
            {pagination.skip + 1} -
            {pagination.currentPage == pagination.numberOfPages
              ? productlength
              : pagination.limit + pagination.skip}
            {/* {pagination.limit + pagination.skip} */} of over {productlength}{" "}
            results for  <span className="text-danger fw-bold">  {categoryName} </span>
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


      <div className="row mt-2 mb-2">
        <div className="col-lg-2 filter">
          <p className="fs-5  fw-bold mb-0 mt-3">{categoryName}</p>
          {lang === "en" ? (
            <div>
              {subCategories.map((sub) => (
                <a
                  key={sub._id}
                  onClick={() =>
                    navigate(
                      `/products/SubCategory/${sub._id}`
                      // , {params:sub.en.name}
                    )
                  }
                >
                  <p className="p-0 my-0 ms-4 text-truncate fs-6">
                    {sub.en.name}
                  </p>
                </a>
              ))}

              <h4 className="mt-3">Rating</h4>
              <label className="d-block fs-6 ms-2">
                <input
                  type="radio"
                  name="rating"
                  value=""
                  onChange={handleRatingChange}
                />
                All 
              </label>
              <label className="d-block fs-6 ms-2">
                <input
                  type="radio"
                  name="rating"
                  value={5}
                  onChange={handleRatingChange}
                />
                Equal to 5 stars
              </label>
              <label className="d-block fs-6 ms-2">
                <input
                  type="radio"
                  name="rating"
                  value={4}
                  onChange={handleRatingChange}
                />
                Equal to 4 stars
              </label>
              <label className="d-block fs-6 ms-2">
                <input
                  type="radio"
                  name="rating"
                  value={3}
                  onChange={handleRatingChange}
                />
                Equal to 3 stars
              </label>
              <label className="d-block fs-6 ms-2">
                <input
                  type="radio"
                  name="rating"
                  value={2}
                  onChange={handleRatingChange}
                />
                Equal to 2 stars
              </label>
              <label className="d-block fs-6 ms-2">
                <input
                  type="radio"
                  name="rating"
                  value={1}
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
                </label>
                <br />

                <h4>Brands</h4>
                {loadingBrands ? (
                  <Spinner
                    style={{ color: "#FF9900" }}
                    className="m-auto"
                    animation="border"
                    role="status"
                  ></Spinner>
                ) : (
                  enBrands?.map((bd) => (
                    <label key={bd} className="d-block fs-6 ms-2">
                      <input
                        type="checkbox"
                        value={bd}
                        onChange={(ev) => handleBrandChange(ev)}
                        // checked={brand.includes(bd)}
                      />
                      {bd}
                    </label>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div>
              <h3>{categoryName}</h3>

              {subCategories.map((sub) => (
                <a
                  className="p-0 my-0 ms-4 text-truncate fs-6"
                  key={sub._id}
                  onClick={() =>
                    navigate(`/products/SubCategory/${sub._id}`, {
                      params: sub.ar.name,
                    })
                  }
                >
                  <p>{sub.ar.name}</p>
                </a>
              ))}

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
                {loadingBrands ? (
                  <Spinner
                    style={{
                      color: "#FF9900",
                      width: "20px",
                      height: "20px",
                    }}
                    className="me-3"
                    animation="border"
                    role="status"
                  ></Spinner>
                ) : (
                  arBrands?.map((bd) => (
                    <label key={bd} className="d-block fs-6 ms-2">
                      <input
                        type="checkbox"
                        value={bd}
                        onChange={(ev) => handleBrandChange(ev)}
                        // checked={brand.includes(bd)}
                      />
                      {bd}
                    </label>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className="col-lg-10">
         
          <div className="row">
            {loading ? (
              <div className="m-auto d-flex vh-100">
                <Spinner
                  style={{ color: "#FF9900" }}
                  className="m-auto"
                  animation="border"
                  role="status"
                ></Spinner>
              </div>
            ) : categoryProducts.length > 0 ? (
              categoryProducts.map((product, index) => (
                // return (
                <ProductCard
                  key={index}
                  productID={product._id}
                  productTitle={
                    lang === "en" ? product.en?.title : product.ar?.title
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
                    lang === "en" ? product.en?.brand : product.ar?.brand
                  }
                />
              ))
            ) : (
              <h5>No Products Match your choice</h5>
            )}
          </div>
        </div>
      </div>

      {/* <PaginationFilter pageCount={pagination.numberOfPages} /> */}

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
