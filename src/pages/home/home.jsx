import { useEffect } from "react";
import MainSlider from "./mainSlider";

export const Home = () => {
    useEffect(() => {
        document.title = "Amazon";
    }, []);
    return(
          
    <>
    <div>home</div>

    <div className="container-fluid p-0 position-relative bg-body-secondary">
     <MainSlider/>
    <div className="container-fluid p-0 position-absolute top-50 start-0">
        </div>

        </div>
    </>
    )
  
};
