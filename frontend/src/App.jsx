import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import NavBar from "./components/NavBar";
import CreateCart from "./components/CreateCart";
import Carts from "./components/Carts";
import "./App.css";
import "./index.css";

function App() {
    const [carts, setCarts] = useState([]); // remember to use [] state to store fetched data
    const [cartLength, setCartLength] = useState(0);

    // TODO: need to change this to async, await and add loading state
    function getCarts() {
        const URL = "http://127.0.0.1:5000/cart/";
        fetch(URL, {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCarts(data.data);
                setCartLength(data.count);
            });
    }

    useEffect(() => {
        // handle GET request
        getCarts();
    }, []);

    function handleNewCart(cart) {
        setCarts([cart, ...carts]);
        setCartLength(cartLength + 1);
    }
    return (
        <div className="">
            <NavBar></NavBar>
            <CreateCart handleNewCart={handleNewCart}></CreateCart>
            <Carts carts={carts} cartLength={cartLength}></Carts>

            {/* <div className="p-10 bg-green-500">
                <h1 className="p-5 bg-green-500">HIIIIIII this is a test</h1>
            </div> */}
        </div>
    );
}

export default App;
