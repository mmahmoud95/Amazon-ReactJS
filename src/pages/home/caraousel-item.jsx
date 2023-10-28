/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { instance } from "../../services/axios/instance";

export default function CarouselItem(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    instance
      .get(`?skip=${props.skip}&limit=${props.limit}`)
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="row">
        {products.map((prd) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={prd.id}>
            <a>
              <img
                className="m-3"
                src={prd.images[0]}
                alt=""
                style={{ height: "12rem" }}
              />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
