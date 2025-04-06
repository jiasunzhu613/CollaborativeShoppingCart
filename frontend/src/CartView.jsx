import NavBar from "./components/NavBar";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import Cart from "./components/Cart";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import AuthContext from "./context/AuthProvider";

function CartView() {
    let { uuid } = useParams();
    const { auth } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [categorizedItems, setCategorizedItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [wantToTruncate, setWantToTruncate] = useState(1);
    const [category, setCategory] = useState("");
    const [recipeDisplay, setRecipeDisplay] = useState(0);
    const BACKEND_URL = import.meta.env.VITE_BACKEND;
    const authorizationValue = import.meta.env.authorizationValue;
    const navigate = useNavigate();

    // TODO: check status, return table not found if uuid is invalid

    async function post_item(item_name, quantity, category) {
        const URL = `${BACKEND_URL}/cart_item/${uuid}`;
        const content = {
            item_name: item_name,
            quantity: quantity,
            category: category,
            // creator: auth.user_id,
        };

        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorizationValue: authorizationValue,
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
                setItems(() => new_items);
                setCategorizedItems(() => new_items);
                setFilteredItems(() => new_items);
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
                authorizationValue: authorizationValue,
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
        async function verify_cart() {
            const URL = `${BACKEND_URL}/cart/${uuid}`;

            await fetch(URL, {
                method: "GET",
                headers: {
                    authorizationValue: authorizationValue,
                },
            })
                .catch((error) => {
                    console.log(error);
                    navigate("/404");
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setItems(() => data.data.cart_items);
                    setCategorizedItems(() => data.data.cart_items);
                    setFilteredItems(() => data.data.cart_items);
                    console.log(data.data.cart_items);
                    // setCartLength(data.count);
                });
        }
        async function get_items() {
            const URL = `${BACKEND_URL}/cart/${uuid}`;

            await fetch(URL, {
                method: "GET",
                headers: {
                    authorizationValue: authorizationValue,
                },
            })
                .catch((error) => {
                    console.log(error);
                    navigate("/404");
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setItems(() => data.data.cart_items);
                    setCategorizedItems(() => data.data.cart_items);
                    setFilteredItems(() => data.data.cart_items);
                    console.log(data.data.cart_items);
                    // setCartLength(data.count);
                });
        }
        get_items();
    }, [BACKEND_URL, navigate, uuid]);

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
            setCategorizedItems(() => items);
            setFilteredItems(() => items);
            setCategory(() => "");
            return;
        }
        const categorized_items = items.filter(
            (item) => item.category === category
        );
        setCategorizedItems(() => categorized_items);
        setFilteredItems(() => categorized_items);
        setCategory(() => category);
        console.log(categorizedItems);
    }

    function filterByString() {
        let string = document.getElementById("filter").value;
        if (!string) {
            setFilteredItems(() => categorizedItems);
            console.log(filteredItems);
            return;
        }
        const filtered_items = categorizedItems.filter((item) =>
            item.item_name.includes(string)
        );
        setFilteredItems(() => filtered_items);
    }
    console.log(items);
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
                                    <SelectItem value="Other">Other</SelectItem>
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
                        <div className="flex-col">
                            <button
                                id="chat-button"
                                className="p-1 m-1 border shadow-sm rounded-full"
                                onClick={() =>
                                    setRecipeDisplay((recipe) => !recipe)
                                }
                            >
                                <ChatBubbleIcon className="m-1" />
                            </button>
                            {recipeDisplay ? (
                                <div className="absolute float border shadow-sm bg-white rounded-lg p-2">
                                    <h3>Want to try a new recipe?</h3>
                                    <input
                                        id="recipe"
                                        placeholder="Recipe"
                                        className="border shadow-sm py-1 px-2 rounded-md outline-none w-full"
                                    ></input>
                                </div>
                            ) : null}
                        </div>
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
