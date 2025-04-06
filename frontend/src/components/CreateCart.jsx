import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

function CreateCart({ handleNewCart }) {
    const [expand, setExpand] = useState(false); // need const for react hooks
    const [cartName, setCartName] = useState("");
    const [cartDesc, setCartDesc] = useState("");
    const cartCreationRef = useRef(); // ref that will point to our cart creation div
    const BACKEND_URL = import.meta.env.VITE_BACKEND;
    const authorizationValue = import.meta.env.authorizationValue;

    // TODO: brings pop up down that maybe says something like "CREATED"
    // TODO: perform empty checks

    function handleCartCreation() {
        console.log("creating cart");
        // let title = document.getElementById("cart_title").value;
        // let desc = document.getElementById("cart_description").value;
        // both empty string, just stop expand
        if (!cartName && !cartDesc) {
            setExpand(false);
            return;
        }
        if (cartName) {
            postCart({ title: cartName, description: cartDesc });
            // document.getElementById("cart_title").value = "";
            // document.getElementById("cart_description").value = "";
            setCartName(() => "");
            setCartDesc(() => "");
            setExpand(false);
            // if a mouse down event happens outside of the cart creation div, we want to stop expanding
        } else if (cartDesc) alert("need title");
    }

    function postCart(data) {
        const URL = `${BACKEND_URL}/cart/`;
        fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                authorizationToken: authorizationValue,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error("Network response was not ok");
                return response.json();
            })
            .then((newCart) => {
                handleNewCart(newCart);
                // console.log("posted");
                // console.log(newCart);
            });
    }

    useEffect(() => {
        // Create event handler to check if mousedown events happen outside of the cart creation div
        let handler = (e) => {
            // check if ref div contains the DOM node that triggered the event
            // e.preventDefault();
            if (!cartCreationRef.current.contains(e.target)) {
                handleCartCreation();
                // console.log(e.target);
            }
        };
        // add event listener
        document.addEventListener("mousedown", handler);

        // clean-up function to remove mousedown event listener
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [cartDesc, cartName]);

    return (
        <div className="flex items-center justify-center">
            {/* add onclick for this? */}
            <div
                className="w-1/2 border shadow-sm bg-card rounded-md"
                ref={cartCreationRef}
            >
                <div className="rounded-md flex justify-between">
                    {/* set this to grow */}
                    <input
                        onClick={() => setExpand(true)}
                        id="cart_title"
                        autoComplete="off"
                        placeholder={"Make New Shopping Cart..."}
                        className="text-secondary-foreground font-semibold rounded-md flex-grow px-4 py-2 outline-none"
                        value={cartName}
                        onChange={(e) => setCartName(e.target.value)}
                    />
                </div>

                {expand ? (
                    <>
                        <div className="flex">
                            <input
                                id="cart_description"
                                autoComplete="off"
                                placeholder={"Cart Description.."}
                                className="text-secondary-foreground rounded-md text-sm flex-grow px-4 py-2 outline-none"
                                value={cartDesc}
                                onChange={(e) => setCartDesc(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={() => handleCartCreation()}
                            className="mx-4 my-2 text-xs py-1 px-2"
                        >
                            Create
                        </Button>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default CreateCart;
