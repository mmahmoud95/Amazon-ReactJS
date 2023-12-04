import React, { useEffect, useState } from "react";
import { IoArrowUpSharp } from "react-icons/io5";
import "./buttonToTop.css";
import { ScrollSpy } from "bootstrap";

export const ButtonToTop = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY =
                window.scrollY || document.documentElement.scrollTop;
            if (scrollY > 500) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8); // Adjust the divisor (8) for smoother/faster scrolling
        }
    };
    return (
        <div
            className={`backToTopContainer ${showButton ? "" : "show-button"}`}
        >
            <div className='back-Top py-2' onClick={scrollToTop}>
                <IoArrowUpSharp className='arrow' />
            </div>
        </div>
    );
};
