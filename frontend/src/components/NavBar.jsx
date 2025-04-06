import { Link } from "react-router";
import logo from "../assets/CollaboraCart.svg";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";
// import { useNavigate } from "react-router";

function NavBar() {
    const { auth, setAuth } = useContext(AuthContext);
    // const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND;
    const authorizationValue = import.meta.env.authorizationValue;
    // let user_id = auth["user_id"];

    function handleSignOut() {
        const URL = `${BACKEND_URL}/session/delete-session`;
        const contents = {
            session_id: auth["session_id"],
        };
        fetch(URL, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
                authorizatonValue: authorizationValue,
            },
            body: JSON.stringify(contents),
        })
            .catch((err) => console.log(err))
            .then((response) => {
                if (response.ok) {
                    setAuth({});
                    localStorage.clear();
                }
            });
    }

    return (
        <nav className="sticky top-1">
            <div className="w-full flex justify-center">
                <div className="m-4 flex items-center justify-between w-[95%] rounded-lg bg-gray-50 border shadow-sm">
                    <Link to="/">
                        <span>
                            <img src={logo} className="p-2 w-[50%]" />
                        </span>
                    </Link>
                    {/* <div>
                        <Link to={`/user/${user_id}`}>
                            <button className="h-10 w-10 bg-red-400 rounded-full mr-2 "></button>
                        </Link>
                    </div> */}
                    {auth ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="h-10 w-10 bg-red-400 rounded-full mr-2 "></button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuLabel>
                                    My Account
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <Link to={`/user/${auth["user_id"]}`}>
                                        <DropdownMenuItem>
                                            More Information
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem
                                        onClick={() => handleSignOut()}
                                    >
                                        <ExitIcon></ExitIcon>
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : null}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
