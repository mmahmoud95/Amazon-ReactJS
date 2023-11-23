import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../services/axios/instance";
import { ProductCard } from "../../components/category-product/productCard";
import { authContext } from "../../context/authcontex";
import axios from "axios";

export const Search = () => {
  let location = useLocation();
  const { searchValue } = location?.state;
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState(categoryProducts);

  const [notFound, setNotFound] = useState("");
  const [Scategory, setScategory] = useState(localStorage.getItem("category"));
  const { lang, setLang } = useContext(authContext);
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [brand, setBrand] = useState([]);
  const [brandCollection, setBrandCollection] = useState([]);
  const [ArbrandCollection, setArBrandCollection] = useState([]);
  const [categoryProdBrand, setCategoryProdBrand] = useState([]);
  const [subCategories, setSubcategories] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("search start");
    document.title = `Amazon - search`;
    window.scrollTo({ top: 0, behavior: "smooth" });
    searchfunc();

    // console.log(res.data.data);
  }, [localStorage.getItem("category"), searchValue]);

  const searchfunc = async () => {
    await axios
      .post(`http://localhost:3333/products/result?search=${searchValue}`, {
        category: localStorage?.getItem("category"),
        lang: lang,
      })
      .then((res) => {
        console.log(res.data, "text");
        // console.log(res.data.products);
        // console.log(rasult[1]);
        if (res.data.data.length > 0) {
          console.log("search done");
          setNotFound("");
          setCategoryProducts(res.data.data);
          setFilteredProducts(res.data.data);
          setCategoryProdBrand(res.data.data);

          // localStorage.setItem('category',"All")

          // console.log(res.data.data);
        } else {
          console.log("dddddddddddddd");
          setCategoryProducts([]);
          setNotFound(`product not found  search again`);
          // console.log(res.data.message);
        }
      })
      .catch((err) => {
        navigate("/");
      });
  };

  let filterProducts = async (filtervalues) => {
    console.log(filtervalues);
    try {
      const priceThreshold = parseInt(filtervalues.price) || 0;
      const ratingThreshold = parseInt(filtervalues.rating, 10) || 0;
      console.log(ratingThreshold, priceThreshold, filtervalues["en.brand"]);
      let filteredData = categoryProducts.filter((item) => {
        let priceMatch, brandMatch, ratingMatch;
        // Check if the item's price is equal to the specified price

        if (lang == "en") {
          brandMatch = filtervalues["en.brand"].includes(item.en.brand);
        } else if (lang == "ar") {
          brandMatch = filtervalues["ar.brand"].includes(item.ar.brand);
        } else {
          brandMatch = null;
        }
        if (
          priceThreshold == 0 &&
          ratingThreshold == 0 &&
          filtervalues["en.brand"].length == 0
        ) {
          return item;
        } else if (
          priceThreshold != 0 &&
          ratingThreshold != 0 &&
          filtervalues["en.brand"].length ==0
        ) {
          ratingMatch = item.rating === ratingThreshold;
          priceMatch = item.price <= priceThreshold;
          return priceMatch && ratingMatch;
        }

        // return priceMatch && ratingMatch &&brandMatch;
      });

      console.log(filteredData, "fouced");

      setFilteredProducts(filteredData);
    } catch (error) {
      console.error(error);
      setCategoryProducts(categoryProducts);
    }
  };
  useEffect(() => {
    generateBrands();
  }, [categoryProducts]);

  const generateBrands = () => {
    if (lang === "en") {
      const enBrands = Array.from(
        new Set(categoryProdBrand.map((product) => product.en.brand))
      );
      setBrandCollection(enBrands);
    } else if (lang === "ar") {
      const arBrands = Array.from(
        new Set(categoryProdBrand.map((product) => product.ar.brand))
      );
      console.log(arBrands, "ddddddarabic");
      setArBrandCollection(arBrands);
    }
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

  useEffect(() => {
    generateBrands();
  }, [categoryProdBrand]);
  useEffect(() => {
    // Cleanup function
    return () => {
      // Set the filtered search data when the component is unmounted
      setFilteredProducts(categoryProducts);
    };
  }, []);

  useEffect(() => {
    applyFilters();
    // filterProducts();
  }, [price, rating, brand]);
  let filtervalues = [];
  const applyFilters = () => {
    if (price) {
      filtervalues["price"] = price;
    }
    if (rating) {
      filtervalues.rating = rating;
    }
    if (brand) {
      filtervalues[lang === "en" ? "en.brand" : "ar.brand"] = brand;
    }

    filterProducts(filtervalues);
  };
  return (
    // <></>
    <section className="container-fluid">
      <div className="row mt-2 mb-2">
        <div className="col-lg-2 filter">
          {
            <div>
              {subCategories.map((sub) => (
                <a
                  key={sub._id}
                  onClick={() => navigate(`/products/SubCategory/${sub._id}`)}
                >
                  <p className="fs-5 border-bottom-1">{sub.en.name}</p>
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
                All Ratings
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
                Greater to 3 stars
              </label>
              <label className="d-block fs-6 ms-2">
                <input
                  type="radio"
                  name="rating"
                  value={2}
                  onChange={handleRatingChange}
                />
                Greater to 2 stars
              </label>
              <label className="d-block fs-6 ms-2">
                <input
                  type="radio"
                  name="rating"
                  value={1}
                  onChange={handleRatingChange}
                />
                Greater to 1 star
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
                  up to $25
                </label>

                <label className="d-block fs-6 ms-2">
                  <input
                    type="radio"
                    name="price"
                    value="50"
                    onChange={handlePriceChange}
                  />
                  up to $50
                </label>
                <label className="d-block fs-6 ms-2">
                  <input
                    type="radio"
                    name="price"
                    value="100"
                    onChange={handlePriceChange}
                  />
                  up to $100
                </label>

                <label className="d-block fs-6 ms-2">
                  <input
                    type="radio"
                    name="price"
                    value="200"
                    onChange={handlePriceChange}
                  />
                  up to $200
                </label>
                <label className="d-block fs-6 ms-2">
                  <input
                    type="radio"
                    name="price"
                    value="300"
                    onChange={handlePriceChange}
                  />
                  up to $300
                </label>
                <br />

                <h4>Brands</h4>
                {brandCollection.map((bd) => (
                  <label key={bd} className="d-block fs-6 ms-2">
                    <input
                      type="checkbox"
                      value={bd}
                      onChange={(ev) => handleBrandChange(ev)}
                      // checked={brand.includes(bd)}
                    />
                    {bd}
                  </label>
                ))}
              </div>
            </div>
          }
        </div>
        <div className="col-lg-10">
          <div className="row">
            {FilteredProducts?.map((product, index) => (
              // return (
              <ProductCard
                key={index}
                productID={product._id}
                productTitle={
                  lang === "en" ? product?.en.title : product?.ar.title
                }
                productRating={product.rating}
                productDiscount={product.discountPercentage}
                productThumbnail={product.thumbnail}
                productPrice={product.price}
                productDescription={
                  lang === "en"
                    ? product?.en.description
                    : product?.ar.description
                }
              />
            ))}
            {<h1>{notFound}</h1>}
          </div>
        </div>
      </div>
    </section>
  );
};
