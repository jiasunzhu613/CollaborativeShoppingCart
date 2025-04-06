import { useState } from "react";
import NavBar from "./components/NavBar";
import { redirect, useNavigate, Link } from "react-router";

function SignUp() {
    const blackCircle = "\u2981";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const BACKEND_URL = import.meta.env.VITE_BACKEND;
    const AUTHORIZATION_VALUE = import.meta.env.AUTHORIZATION_VALUE;
    const navigate = useNavigate();
    // let history = useHistory();

    // TODO: holy this is horribly implemented, FIX ASAP
    // TODO: also add error handling and also PLEASE HANDLE UNIQUE EMAIL BETTER
    function handleSignUp() {
        const URL = `${BACKEND_URL}/user/`;
        const contents = {
            email: email,
            password: password,
        };
        // TODO: do error checking
        fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorizationToken: AUTHORIZATION_VALUE,
            },
            body: JSON.stringify(contents),
        })
            .catch((error) => {
                console.log(error);
                alert("Email already taken");
            })
            .then((response) => {
                if (response.ok) navigate("/sign-in");
            });
    }

    return (
        <div className="relative flex flex-col bg-alternative h-screen">
            <NavBar></NavBar>
            <div className="flex flex-1 h-full">
                {/* border-r border-default */}
                <div className="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8">
                    <div className="flex justify-center items-center">
                        <div className="w-[25em]">
                            <h1 className="font-normal text-5xl text-secondary-foreground mb-3">
                                Get Started
                            </h1>
                            <h3 className="font-light text-base text-primary mb-5">
                                Create a new account and start Collabora-carting
                            </h3>

                            <h3 className="font-light text-base text-primary mb-2">
                                Email
                            </h3>
                            <input
                                className="w-full bg-slate-50 border shadow-sm p-2 px-3 rounded-md mb-2 text-sm"
                                placeholder="yourname@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>

                            <h3 className="font-light text-base text-primary mb-2">
                                Password
                            </h3>
                            <input
                                className="w-full bg-slate-50 border shadow-sm p-2 px-3 rounded-md mb-2 text-sm"
                                placeholder={`${blackCircle.repeat(6)}`}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <button
                                onClick={() => handleSignUp()}
                                className="w-full bg-[#d6f0f8] border shadow-sm p-2 px-3 rounded-md mb-2 text-sm hover:bg-[#c9eaf4]"
                            >
                                Sign up
                            </button>
                            <h3 className="text-sm font-light mb-2 text-secondary-foreground">
                                Have an account already?{" "}
                                <Link
                                    to="/sign-in"
                                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                                >
                                    {" "}
                                    Sign in here!
                                </Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
