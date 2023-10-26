import { useEffect } from "react";

export const Home = () => {
    useEffect(() => {
        document.title = "Amazon";
    }, []);
    return <div>home</div>;
};
