import { useState, useEffect, useContext } from "react";
import NavBar from "./components/NavBar";
import CreateCart from "./components/CreateCart";
import Carts from "./components/Carts";
import AuthContext from "./context/AuthProvider";
import "./App.css";
import "./index.css";
import { useNavigate } from "react-router";

// TODO: localstorage/caching stuff should be written better, consult: https://www.robinwieruch.de/local-storage-react/
function CartsHome() {
    const { auth } = useContext(AuthContext);
    const [carts, setCarts] = useState([]); // remember to use [] state to store fetched data
    const [cartLength, setCartLength] = useState(0);
    const [loading, setLoading] = useState(0);
    // const [validSession, setValidSession] = useState(0);
    const BACKEND_URL = import.meta.env.VITE_BACKEND;
    const AUTHORIZATION_VALUE = import.meta.env.VITE_AUTHORIZATION_VALUE;
    const navigate = useNavigate();

    async function delete_cart(uuid) {
        const URL = `${BACKEND_URL}/cart/${uuid}`;
        await fetch(URL, {
            method: "DELETE",
            credentials: "include",
            headers: {
                authorizationToken: AUTHORIZATION_VALUE,
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }

    function handleNewCart(cart) {
        setCarts((carts) => [cart, ...carts]);
        setCartLength((cartLength) => cartLength + 1);
        // Notes on using updater functions: https://react.dev/learn/queueing-a-series-of-state-updates
        // react automatically passes arguments in
        // states are not updated automatically, and updates are usually batched. this means that sometimes the values you are referring to is not
        // its "true" value and is behind
        // Using update function (a) => smt, we can ensure that we are acting on the most recent state (? is recent a good way to describe it?)
        console.log(carts);

        // caching, TODO: fix later to be cleaner
        let currentCarts = JSON.parse(localStorage.getItem("carts") || "[]");
        currentCarts.unshift(cart);
        localStorage.setItem("carts", JSON.stringify(currentCarts));
        localStorage.setItem(
            "cartLength",
            +localStorage.getItem("cartLength") + 1
        );
    }

    function handleDelete(uuid) {
        setCarts((carts) => carts.filter((cart) => cart.id != uuid));
        setCartLength((cartLength) => cartLength - 1);
        delete_cart(uuid);
        console.log("deleted");

        // caching, TODO: fix later to be cleaner
        let currentCarts = JSON.parse(localStorage.getItem("carts") || "[]");
        currentCarts = currentCarts.filter((cart) => cart.id != uuid);
        localStorage.setItem("carts", JSON.stringify(currentCarts));
        localStorage.setItem(
            "cartLength",
            +localStorage.getItem("cartLength") - 1
        );
    }

    // function verifySession() {
    //     console.log(auth?.session_id);
    //     if (auth?.session_id) return;

    //     const URL = `${BACKEND_URL}/session/verify-session`;
    //     return fetch(URL, {
    //         method: "GET",
    //         credentials: "include",
    //         headers: {
    //             "Access-Control-Allow-Credentials": true,
    //         },
    //     })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //         .then((response) => {
    //             console.log(response.ok);
    //             if (response.ok) return response.json();
    //             else navigate("/sign-in");
    //         })
    //         .then((data) => {
    //             if (data) setAuth(() => data);
    //             console.log(auth["session_id"]);
    //         });
    // }

    useEffect(() => {
        // TODO: need to change this to async, await and add loading state
        async function getCarts() {
            const URL = `${BACKEND_URL}/cart/`;
            setLoading(() => 1);
            await fetch(URL, {
                method: "GET",
                credentials: "include",
                authorizationToken: AUTHORIZATION_VALUE,
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setCarts(data.data);
                    setCartLength(data.count);
                    console.log(data.data);

                    // caching, TODO: fix later to be cleaner
                    localStorage.setItem("carts", JSON.stringify(data.data)); // store list of json data as a string in localstorage
                    localStorage.setItem("cartLength", data.count);
                });
            setLoading(() => 0);
        }
        // handle GET request
        if (localStorage.getItem("carts") === null) {
            getCarts();
        } else {
            // caching, TODO: fix later to be cleaner
            setCarts(JSON.parse(localStorage.getItem("carts") || "[]")); // parse list of json objects from localstorage
            setCartLength(localStorage.getItem("cartLength"));
        }
    }, [BACKEND_URL, navigate]);

    // useEffect(() => {
    //     function redirect() {
    //         if (!auth?.session_id) navigate("/sign-in");
    //     }
    //     redirect();
    // }, [auth, navigate]);
    // if (!auth?.session_id) navigate("/sign-in");
    // if (loading) return <div></div>;

    return auth?.session_id ? (
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
    ) : null;
}

export default CartsHome;
