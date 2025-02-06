import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

function CartView() {
    let { uuid } = useParams();
    const [items, setItems] = useState([]);

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
                setItems(data.data.cart_items);
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
        <div>
            <NavBar></NavBar>
            {/* <Button onClick={addItem} className="m-4">
                Add item
            </Button>
            <div className="m-4">
                <Label>Item Name</Label>
                <Input id="item_name"></Input>
                <Label>Quantity</Label>
                <Input id="quantity"></Input>
            </div> */}
            {/* Cart Item Div */}
            {/* <div className="w-1/2">
                {items.map((item) => (
                    <Card className="p-4">
                        <div className="flex flex-row items-center justify-between">
                            <CardTitle>{item.item_name}</CardTitle>
                            <CardDescription className="items-center">
                                Quantity: {item.quantity}
                            </CardDescription>
                        </div>
                    </Card>
                ))}
            </div> */}
            <div className="h-[40em] p-2 mx-8 rounded-lg bg-pink-300 w-1/2 overflow-y-scroll">
                {items.map((item) => (
                    <Card className="m-2 p-4">
                        <div className="flex flex-row items-center justify-between">
                            <CardTitle>{item.item_name}</CardTitle>
                            <CardDescription className="items-center">
                                Quantity: {item.quantity}
                            </CardDescription>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default CartView;
