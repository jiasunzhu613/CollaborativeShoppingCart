import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";

function CreateCart({ handleNewCart }) {
    const [expand, setExpand] = useState(false); // need const for react hooks
    const cartCreationRef = useRef(); // ref that will point to our cart creation div

    // TODO: brings pop up down that maybe says something like "CREATED"
    // TODO: perform empty checks
    function postCart(data) {
        const URL = "http://127.0.0.1:5000/cart/";
        console.log(document.getElementById("cart_title"));
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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
                console.log("posted");
                console.log(newCart);
            });
    }

    useEffect(() => {
        // Create event handler to check if mousedown events happen outside of the cart creation div
        let handler = (e) => {
            // check if ref div contains the DOM node that triggered the event
            if (!cartCreationRef.current.contains(e.target)) {
                handleCartCreation();
                console.log(e.target);
            }
        };
        // add event listener
        document.addEventListener("mousedown", handler);

        // clean-up function to remove mousedown event listener
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    function handleCartCreation() {
        let title = document.getElementById("cart_title").value;
        let desc = document.getElementById("cart_description").value;
        // both empty string, just stop expand
        if (!title && !desc) {
            setExpand(false);
            return;
        }
        if (title) {
            postCart({ title: title, description: desc });
            document.getElementById("cart_title").value = "";
            document.getElementById("cart_description").value = "";
            setExpand(false);
            // if a mouse down event happens outside of the cart creation div, we want to stop expanding
        } else if (desc) alert("need title");
    }

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
                            />
                        </div>
                        <Button
                            onClick={handleCartCreation}
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
