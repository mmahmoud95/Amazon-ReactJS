import { useEffect } from "react";
import electronics from "../../assets/home/cards/electronics.jpg";
import healthCare from "../../assets/home/cards/health care.jpg";
import home from "../../assets/home/cards/home.jpg";
import toys from "../../assets/home/cards/toys.jpg";
import headphone1 from "../../assets/home/cards/headphone4.jpg";
import headphone2 from "../../assets/home/cards/headphone2.jpg";
import headphone3 from "../../assets/home/cards/headphone3.jpg";
import headphone4 from "../../assets/home/cards/headphone4.jpg";
import fur1 from "../../assets/home/cards/fur1.jpg";
import fur2 from "../../assets/home/cards/fur2.jpg";
import fur3 from "../../assets/home/cards/fur3.jpg";
import fur4 from "../../assets/home/cards/fur4.jpg";
import shopSchool from "../../assets/home/cards/shop school.jpg";
import tv from "../../assets/home/cards/tv.jpg";
import MainSlider from "./mainSlider";
import MonoCard from "./mono-card";
import QuartitCard from "./quartit-card";

export const Home = () => {
    useEffect(() => {
        document.title = "Amazon";
    }, []);
    return (
        <>
            <div className='container-fluid p-0 position-relative bg-body-secondary'>
                {/* main slider */}
                <MainSlider />
                <div className='container-fluid p-0 position-absolute top-50 start-0'>
                    {/* //////////////// cards //////////////*/}
                    <div className='row gy-3 m-0 p-4'>
                        <MonoCard
                            breackPoint='col-lg-3 col-sm-4 p-0'
                            title='Electronics'
                            navigation='laptops'
                            image={electronics}
                            body='See more'
                        />

                        <MonoCard
                            breackPoint='col-lg-3 col-sm-4 p-0'
                            title=' Health & Personal Care'
                            navigation='skincare'
                            image={healthCare}
                            body='See more'
                        />

                        <MonoCard
                            breackPoint='col-lg-3 col-sm-4 p-0'
                            title='Home & Kitchen Under $30'
                            navigation='home-decoration'
                            image={home}
                            body='Shop now'
                        />

                        <MonoCard
                            breackPoint='col-lg-3 col-sm-4 p-0'
                            title='Toys Under $30'
                            navigation='home-decoration'
                            image={toys}
                            body='Shop now'
                        />

                        <QuartitCard
                            breackPoint='col-lg-3 col-sm-4 p-0'
                            title='Pick up where you left off'
                            navigation='laptops'
                            image1={headphone1}
                            image2={headphone2}
                            image3={headphone3}
                            image4={headphone4}
                            body='View your browsing history'
                        />

                        <QuartitCard
                            breackPoint='col-lg-3 col-sm-4 p-0'
                            title='Pick up where you left off'
                            navigation='furniture'
                            image1={fur1}
                            image2={fur2}
                            image3={fur3}
                            image4={fur4}
                            body='View your browsing history'
                        />

                        <MonoCard
                            breackPoint='col-lg-3 col-sm-4 p-0'
                            title='Shop school essentials'
                            navigation='home-decoration'
                            image={shopSchool}
                            body='See more'
                        />

                        <MonoCard
                            breackPoint='col-lg-3 col-sm-4 p-0'
                            title='Get your TV easily'
                            navigation='laptops'
                            image={tv}
                            body='See more'
                        />
                    </div>
                    {/* ///////////cards///////////////////// */}
                </div>
            </div>
        </>
    );
};
