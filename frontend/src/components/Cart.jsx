import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function Cart({ items, addItem, deleteItem }) {
    const [wantToAddItem, setWantToAddItem] = useState(0);
    const [category, setCategory] = useState("");

    function handleAddItem(category) {
        addItem(category);
        setWantToAddItem(() => 0);
        setCategory(() => "");
    }

    function handleDeleteItem(item_id) {
        deleteItem(item_id);
    }

    function handleCategoryChange(category) {
        if (!category) {
            setCategory(() => "");
            return;
        }
        setCategory(() => category);
    }

    return (
        <div className="my-2 w-1/2">
            <hr className="bg-slate-600"></hr>
            {items.map((item) => (
                <>
                    <div className="flex justify-between my-2">
                        <div className="flex px-2 items-center">
                            {/* <div className="p-2 m-1 rounded-full border shadow-sm group">
                                <CheckIcon className="absolute !p-0 !m-0 size-3 group-hover: visible"></CheckIcon>
                            </div> */}
                            {/* <div
                                type="radio"
                                className="p-2 m-1 rounded-full border shadow-sm hover:fill-red-600"
                            ></div> */}
                            <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="flex items-center justify-center rounded-full size-5 m-1 border shadow-sm group"
                            >
                                <CheckIcon className="size-3 invisible group-hover:visible"></CheckIcon>
                            </button>
                            <h1 className="text-foreground">
                                {item.item_name}{" "}
                            </h1>
                        </div>
                        <h1 className="text-foreground px-2">
                            Quantity: {item.quantity}{" "}
                        </h1>
                    </div>
                    <hr className="bg-slate-600"></hr>
                </>
            ))}
            {wantToAddItem ? (
                <div
                    className="my-2 w-full border shadow-sm bg-card rounded-md"
                    // ref={cartCreationRef}
                >
                    <div className="rounded-md flex justify-between">
                        {/* set this to grow */}
                        <input
                            // onClick={() => setExpand(true)}
                            id="item_name"
                            autoComplete="off"
                            placeholder={"Item Name..."}
                            className="text-secondary-foreground font-semibold rounded-md flex-grow px-4 py-2 outline-none"
                        />
                    </div>
                    <div className="flex">
                        <input
                            id="quantity"
                            autoComplete="off"
                            placeholder={"Quantity..."}
                            className="text-secondary-foreground rounded-md text-sm flex-grow px-4 outline-none"
                        />
                    </div>

                    <div className="flex">
                        <button
                            onClick={() => {
                                handleAddItem(category);
                            }}
                            className="mx-4 my-2 text-xs py-2 px-2 bg-secondary-foreground text-white rounded-md"
                        >
                            Create
                        </button>

                        {/* <DropdownMenu>
                            <DropdownMenuTrigger className="mr-4 my-2 text-xs py-2 px-2 bg-secondary-foreground text-white rounded-md">
                                Category
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Fruit & Veg</DropdownMenuItem>
                                <DropdownMenuItem>Meat</DropdownMenuItem>
                                <DropdownMenuItem>Snacks</DropdownMenuItem>
                                <DropdownMenuItem>Grains</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}

                        <Select
                            value={category}
                            onValueChange={(category) => {
                                handleCategoryChange(category);
                            }}
                        >
                            <SelectTrigger className="w-[12em] mr-4 my-2 text-xs py-2 px-2 bg-secondary-foreground text-white rounded-md">
                                <SelectValue placeholder="Select a category" />
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

                        <button
                            onClick={() => {
                                setCategory(() => "");
                                setWantToAddItem(() => 0);
                            }}
                            className="my-2 text-xs py-2 px-2 bg-secondary-foreground text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex justify-between my-2">
                        <div className="flex px-2">
                            <div className="p-2 m-1 rounded-full border shadow-sm"></div>

                            <a
                                className="text-foreground hover:underline cursor-pointer"
                                onClick={() => {
                                    setWantToAddItem(() => 1);
                                }}
                            >
                                <span className="opacity-50">Add item</span>
                            </a>
                        </div>
                        {/* <h1 className="text-foreground px-2">Quantity:</h1> */}
                    </div>
                    <hr className="bg-slate-600"></hr>
                </>
            )}
        </div>
    );
}

export default Cart;
