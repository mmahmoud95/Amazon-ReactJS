import school from '../../assets/home/mainSlider-images/school.jpg'
import kitchen from '../../assets/home/mainSlider-images/kitchen.jpg'
import books from '../../assets/home/mainSlider-images/books.jpg'
import gaming from '../../assets/home/mainSlider-images/gaming.jpg'
import toys from '../../assets/home/mainSlider-images/toys.jpg'
import beauty from '../../assets/home/mainSlider-images/beauty.jpg'
import { useNavigate } from "react-router-dom";


export default function MainSlider(){
    const navigate = useNavigate()
    return(
<>
<div className="row px-0 m-0" >
    <div


        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
    >
        <div className="carousel-inner">
            <div className="carousel-item active">
                <a  onClick={() => {
                            navigate(`/products/category/lighting`);
                        }}>
                    <img
                        src={school}
                        className="d-block w-100"
                        alt="shop school"
                    />
                </a>
            </div>
            <div className="carousel-item">
                <a onClick={() => {
                            navigate(`/products/category/groceries`);
                        }}>
                    <img
                        src={kitchen}
                        className="d-block w-100"
                        alt="kitchen favourites"
                    />
                </a>
            </div>
            <div className="carousel-item">
                <a onClick={() => {
                            navigate(`/products/category/furniture`);
                        }}>
                    <img
                        src={books}
                        className="d-block w-100"
                        alt="shop books"
                    />
                </a>
            </div>
            <div className="carousel-item">
                <a onClick={() => {
                            navigate(`/products/category/motorcycle`);
                        }}>
                    <img
                        src={gaming}
                        className="d-block w-100"
                        alt="gaming shop"
                    />
                </a>
            </div>
            <div className="carousel-item">
                <a onClick={() => {
                            navigate(`/products/category/lighting`);
                        }}>
                    <img
                        src={toys}
                        className="d-block w-100"
                        alt="New Arrival in Toys"
                    />
                </a>
            </div>
            <div className="carousel-item">
                <a onClick={() => {
                            navigate(`/products/category/skincare`);
                        }}>
                    <img
                        src={beauty}
                        className="d-block w-100"
                        alt="beauty products"
                    />
                </a>
            </div>
        </div>
        <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
        >
            <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
        >
            <span
                className="carousel-control-next-icon"
                aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
</div>
</>
    )

}