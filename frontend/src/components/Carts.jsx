import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Reorder } from "motion/react";

function Carts({ carts, cartLength }) {
    const [items, setItems] = useState([0, 1, 2, 3]); // was used for framer motion stuff

    return (
        <div className="flex justify-center mx-auto my-10">
            {cartLength > 0 ? (
                <div className="grid grid-cols-4">
                    {carts.map((cart) => (
                        <Card className="w-[20rem] m-4">
                            <CardHeader>
                                <CardTitle>{cart.title}</CardTitle>
                                <CardDescription>
                                    {cart.description}
                                </CardDescription>
                            </CardHeader>
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
