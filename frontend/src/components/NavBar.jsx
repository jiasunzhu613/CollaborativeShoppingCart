import { Link } from "react-router";
import logo from "../assets/CollaboraCart.svg";

function NavBar() {
    return (
        <nav className="sticky top-1">
            <div className="w-full flex justify-center">
                <div className="m-4 flex justify-between w-[95%] rounded-lg bg-gray-50 border shadow-sm">
                    <Link to="/">
                        <span>
                            <img src={logo} className="p-2 w-[50%]" />
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
