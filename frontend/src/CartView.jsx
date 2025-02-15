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
import Cart from "./components/Cart";
import {
    ChevronDownIcon,
    ChevronUpIcon,
    Cross2Icon,
} from "@radix-ui/react-icons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function CartView() {
    let { uuid } = useParams();
    const [items, setItems] = useState([]);
    const [categorizedItems, setCategorizedItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [wantToTruncate, setWantToTruncate] = useState(1);
    const [category, setCategory] = useState("");
    const BACKEND_URL = import.meta.env.VITE_BACKEND;

    // TODO: check status, return table not found if uuid is invalid
    async function get_items() {
        const URL = `${BACKEND_URL}/cart/${uuid}`;

        await fetch(URL, {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setItems((items) => data.data.cart_items);
                setCategorizedItems((categorizedItems) => data.data.cart_items);
                setFilteredItems((filteredItems) => data.data.cart_items);
                console.log(data.data.cart_items);
                // setCartLength(data.count);
            });
    }

    async function post_item(item_name, quantity, category) {
        const URL = `${BACKEND_URL}/cart_item/${uuid}`;
        const content = {
            item_name: item_name,
            quantity: quantity,
            category: category,
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
                const new_items = [...items, data];
                setItems((items) => new_items);
                setCategorizedItems((categorizedItems) => new_items);
                setFilteredItems((filteredItems) => new_items);
                console.log(data);
            });
        document.getElementById("item_name").value = "";
        document.getElementById("quantity").value = "";
    }

    async function delete_item(item_id) {
        const URL = `${BACKEND_URL}/cart_item/${item_id}`;
        await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }

    useEffect(() => {
        get_items();
    }, []);

    function addItem(category) {
        let item_name = document.getElementById("item_name").value;
        let quantity = document.getElementById("quantity").value;

        if (item_name && quantity) post_item(item_name, quantity, category);
    }

    function deleteItem(item_id) {
        // const new_items = items.filter((item) => item.id != item_id);
        setItems((items) => items.filter((item) => item.id != item_id));
        setCategorizedItems((categorizedItems) =>
            categorizedItems.filter((item) => item.id != item_id)
        );
        setFilteredItems((filteredItems) =>
            filteredItems.filter((item) => item.id != item_id)
        );
        delete_item(item_id);
    }

    function filterByCategory(category) {
        document.getElementById("filter").value = "";
        if (!category) {
            setCategorizedItems((categorizedItems) => items);
            setFilteredItems((filteredItems) => items);
            setCategory((c) => "");
            return;
        }
        const categorized_items = items.filter(
            (item) => item.category === category
        );
        setCategorizedItems((categorizedItems) => categorized_items);
        setFilteredItems((filteredItems) => categorized_items);
        setCategory((c) => category);
        console.log(categorizedItems);
    }

    function filterByString() {
        let string = document.getElementById("filter").value;
        if (!string) {
            setFilteredItems((filteredItems) => categorizedItems);
            console.log(filteredItems);
            return;
        }
        const filtered_items = categorizedItems.filter((item) =>
            item.item_name.includes(string)
        );
        setFilteredItems((filteredItems) => filtered_items);
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
                        className={`font-light break-words ${
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
                        <Select
                            value={category}
                            onValueChange={(category) => {
                                console.log(category);
                                filterByCategory(category);
                            }}
                        >
                            <SelectTrigger className="border shadow-sm rounded-md mr-2 w-[30%]">
                                <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    <SelectItem value="Fruit & Veg">
                                        Fruit & Veg
                                    </SelectItem>
                                    <SelectItem value="Meat">Meat</SelectItem>
                                    <SelectItem value="Snacks">
                                        Snacks
                                    </SelectItem>
                                    <SelectItem value="Grains">
                                        Grains
                                    </SelectItem>
                                    {category && (
                                        <SelectItem value={undefined}>
                                            None
                                        </SelectItem>
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <input
                            id="filter"
                            placeholder="Filter"
                            className="border shadow-sm py-1 px-2 rounded-md outline-none w-full"
                            onChange={() => filterByString()}
                        ></input>
                    </div>
                </div>
                <Cart
                    items={filteredItems}
                    addItem={addItem}
                    deleteItem={deleteItem}
                ></Cart>
            </div>
        </>
    );
}

export default CartView;
