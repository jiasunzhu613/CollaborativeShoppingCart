import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import CreateCart from "./components/CreateCart";
import Carts from "./components/Carts";
import "./App.css";
import "./index.css";

function CartsHome() {
    const [carts, setCarts] = useState([]); // remember to use [] state to store fetched data
    const [cartLength, setCartLength] = useState(0);
    const [loading, setLoading] = useState(0);

    // TODO: need to change this to async, await and add loading state
    async function getCarts() {
        const URL = "http://127.0.0.1:5000/cart/";
        setLoading((loading) => 1);
        await fetch(URL, {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCarts(data.data);
                setCartLength(data.count);
            });
        setLoading((loading) => 0);
    }

    async function delete_cart(uuid) {
        const URL = `http://127.0.0.1:5000/cart/${uuid}`;
        await fetch(URL, {
            method: "DELETE",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }

    useEffect(() => {
        // handle GET request
        getCarts();
    }, []);

    function handleNewCart(cart) {
        setCartLength((cartLength) => cartLength + 1);
        // Notes on using updater functions: https://react.dev/learn/queueing-a-series-of-state-updates
        // react automatically passes arguments in
        // states are not updated automatically, and updates are usually batched. this means that sometimes the values you are referring to is not
        // its "true" value and is behind
        // Using update function (a) => smt, we can ensure that we are acting on the most recent state (? is recent a good way to describe it?)
        setCarts((carts) => [cart, ...carts]);
    }

    function handleDelete(uuid) {
        setCarts((carts) => carts.filter((cart) => cart.id != uuid));
        delete_cart(uuid);
        console.log("deleted");
    }

    return (
        <div className="">
            <NavBar></NavBar>
            <CreateCart handleNewCart={handleNewCart}></CreateCart>
            <Carts
                carts={carts}
                cartLength={cartLength}
                loading={loading}
                handleDelete={handleDelete}
            ></Carts>

            {/* <div className="p-10 bg-green-500">
                <h1 className="p-5 bg-green-500">HIIIIIII this is a test</h1>
            </div> */}
        </div>
    );
}

export default CartsHome;
