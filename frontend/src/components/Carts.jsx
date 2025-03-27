import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
// import { Reorder } from "motion/react";
import { Link } from "react-router";

function Carts({ carts, cartLength, loading, handleDelete }) {
    // const [items, setItems] = useState([0, 1, 2, 3]); // was used for framer motion stuff

    // TODO: fix navigation
    // let navigate = useNavigate();
    // function handleCartClick(cart) {
    //     localStorage.setItem("title", cart.title);
    //     localStorage.setItem("description", cart.description);
    //     navigate(`/cart/${cart.id}`);
    //     console.log("clicked on cart");
    // }

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
        <div className="mx-10 my-10">
            {cartLength > 0 ? (
                <div className="flex flex-wrap justify-evenly">
                    {carts.map((cart) => (
                        <div key={cart.id} className="m-4">
                            <Card className="w-[20rem]">
                                <Link
                                    to={`/cart/${cart.id}`}
                                    onClick={() => {
                                        localStorage.setItem(
                                            "title",
                                            cart.title
                                        );
                                        localStorage.setItem(
                                            "description",
                                            cart.description
                                        );
                                    }}
                                >
                                    <CardHeader>
                                        <CardTitle>{cart.title}</CardTitle>
                                        <CardDescription className="h-[1.5em] truncate">
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
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl text-secondary-foreground font-bold">
                        No carts created...
                    </h1>
                </div>
            )}
        </div>
    );
}

export default Carts;
