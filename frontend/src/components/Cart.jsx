import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@radix-ui/react-icons";

function Cart({ items, addItem }) {
    const [wantToAddItem, setWantToAddItem] = useState(0);

    function handleAddItem() {
        addItem();
        setWantToAddItem((wtai) => 0);
    }
    return (
        <div className="my-2 w-1/2">
            <hr className="bg-slate-600"></hr>
            {items.map((item) => (
                <>
                    <div className="flex justify-between my-2">
                        <div className="flex px-2">
                            <div className="p-2 m-1 rounded-full border shadow-sm group">
                                <CheckIcon className="absolute !p-0 !m-0 size-3 group-hover: visible"></CheckIcon>
                            </div>
                            {/* <div
                                type="radio"
                                className="p-2 m-1 rounded-full border shadow-sm hover:fill-red-600"
                            ></div> */}
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

                    <>
                        <div className="flex">
                            <input
                                id="quantity"
                                autoComplete="off"
                                placeholder={"Quantity..."}
                                className="text-secondary-foreground rounded-md text-sm flex-grow px-4 outline-none"
                            />
                        </div>
                        <button
                            onClick={() => handleAddItem()}
                            className="mx-4 my-2 text-xs py-2 px-2 bg-secondary-foreground text-white rounded-md"
                        >
                            Create
                        </button>
                        <button
                            onClick={() => {
                                setWantToAddItem((wtai) => 0);
                            }}
                            className="my-2 text-xs py-2 px-2 bg-secondary-foreground text-white rounded-md"
                        >
                            Cancel
                        </button>
                    </>
                </div>
            ) : (
                <>
                    <div className="flex justify-between my-2">
                        <div className="flex px-2">
                            <div className="p-2 m-1 rounded-full border shadow-sm"></div>

                            <a
                                className="text-foreground hover:underline cursor-pointer"
                                onClick={() => {
                                    setWantToAddItem((wtai) => 1);
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
