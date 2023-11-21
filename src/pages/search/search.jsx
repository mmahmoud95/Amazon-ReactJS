import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../services/axios/instance";
import { ProductCard } from "../../components/category-product/productCard";
import { authContext } from "../../context/authcontex";
import axios from "axios";

export const Search = () => {
  let location = useLocation();
  const { searchValue } = location?.state;
  console.log(searchValue,"state");
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [notFound, setNotFound] = useState("");
  const [Scategory, setScategory] = useState(localStorage.getItem("category"));
  const { lang, setLang } = useContext(authContext);

  // const { search } = useLocation();
  // const result = search.split("?");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("search start");
    // document.title = `Amazon - ${categoryName}`;
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
  //  useEffect(() => {
  //         return () => {
  //             // Anything in here is fired on component unmount.
  //           localStorage.setItem('category',"All")

  //         }
  //     }, [])

  // useEffect(() => {
  //     console.log(categoryProducts);
  //     // localStorage.setItem('category',searchCategory)

  //   }, [categoryProducts]);
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
    <section className="container-fluid">
      <div className="row mt-2 mb-2">
        <div className="col-lg-2 filter"></div>
        <div className="col-lg-10">
          {/* <h3>{categoryName}</h3> */}
          <div className="row mt-5">
            <div className="col-12">
              <p>
                5-5 of over 5 results for &nbsp;
                <span className="text-danger">{/* {categoryName} */}</span>
              </p>
            </div>
          </div>
          <div className="row">
            {categoryProducts?.map((product, index) => (
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
