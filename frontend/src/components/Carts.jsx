import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
import { Reorder } from "motion/react";
import { Link } from "react-router";

function Carts({ carts, cartLength, loading, handleDelete }) {
    const [items, setItems] = useState([0, 1, 2, 3]); // was used for framer motion stuff
    if (loading)
        return (
            <div className="flex justify-center mx-auto my-10">
                <div className="flex items-center">
                    <h1 className="text-2xl text-secondary-foreground font-bold">
                        Loading Carts...
                    </h1>
                </div>
            </div>
        );

    return (
        <div className="flex justify-center mx-auto my-10">
            {cartLength > 0 ? (
                <div className="flex flex-wrap">
                    {carts.map((cart) => (
                        <Card className="w-[20rem] m-4">
                            <Link to={`/cart/${cart.id}`}>
                                <CardHeader>
                                    <CardTitle>{cart.title}</CardTitle>
                                    <CardDescription>
                                        {cart.description}
                                    </CardDescription>
                                </CardHeader>
                            </Link>
                            <button
                                onClick={() => handleDelete(cart.id)}
                                className="m-1 p-2 border rounded-full shadow-sm"
                            >
                                <TrashIcon />
                            </button>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex items-center">
                    <h1 className="text-2xl text-secondary-foreground font-bold">
                        No carts created...
                    </h1>
                </div>
            )}
        </div>
    );
}

export default Carts;
