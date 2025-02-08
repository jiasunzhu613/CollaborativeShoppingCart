import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/Card";
import Cart from "./components/Cart";
import { ChevronDownIcon } from "@radix-ui/react-icons";

function CartView() {
    let { uuid } = useParams();
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [wantToTruncate, setWantToTruncate] = useState(1);

    // TODO: check status, return table not found if uuid is invalid
    async function get_items() {
        const URL = `http://127.0.0.1:5000/cart/${uuid}`;

        await fetch(URL, {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setItems((items) => data.data.cart_items);
                setTitle((title) => data.data.title);
                setDescription((description) => data.data.description);
                console.log(data.data.cart_items);
                // setCartLength(data.count);
            });
    }

    async function post_item(item_name, quantity) {
        const URL = `http://127.0.0.1:5000/cart_item/${uuid}`;
        const content = {
            item_name: item_name,
            quantity: quantity,
        };

        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(content),
        })
            .then((response) => {
                if (!response.ok)
                    throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data) => {
                setItems((items) => [...items, data]);
                console.log(data);
            });
        document.getElementById("item_name").value = "";
        document.getElementById("quantity").value = "";
    }

    useEffect(() => {
        get_items();
    }, []);

    function addItem() {
        let item_name = document.getElementById("item_name").value;
        let quantity = document.getElementById("quantity").value;

        if (item_name && quantity) post_item(item_name, quantity);
    }
    return (
        <>
            <NavBar></NavBar>
            <div className="mx-10">
                <div className="w-1/2">
                    <h1 className="font-black text-5xl mb-1">
                        {localStorage.getItem("title")}
                    </h1>
                    <h2
                        className={`font-light ${
                            wantToTruncate ? `truncate` : ``
                        } mb-2`}
                        onClick={() => {
                            setWantToTruncate((wtt) => !wtt);
                        }}
                    >
                        {localStorage.getItem("description")}
                    </h2>
                    <hr className="bg-gray-700 mb-2"></hr>
                    <h1 className="font-black text-3xl mb-1">ITEMS</h1>
                    <div className="flex">
                        <button className="py-1 px-1 border shadow-sm rounded-md mr-2">
                            <span className="flex items-center">
                                <ChevronDownIcon className="mx-1 size-5"></ChevronDownIcon>
                                <h3 className="mr-2">None</h3>
                            </span>
                        </button>
                        <input
                            placeholder="Filter"
                            className="border shadow-sm py-1 px-2 rounded-md outline-none w-full"
                        ></input>
                    </div>
                </div>
                <Cart items={items} addItem={addItem}></Cart>
            </div>
        </>
    );
}

export default CartView;
