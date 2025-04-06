import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import NavBar from "./components/NavBar";
import AuthContext from "./context/AuthProvider";

function SignIn() {
    const { setAuth } = useContext(AuthContext);
    const blackCircle = "\u2981";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const BACKEND_URL = import.meta.env.VITE_BACKEND;
    const AUTHORIZATION_VALUE = import.meta.env.VITE_AUTHORIZATION_VALUE;
    const navigate = useNavigate();

    // function createSession(email) {
    //     const URL = `${BACKEND_URL}/session/new-session`;
    //     const contents = {
    //         email: email,
    //     };
    //     fetch(URL, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(contents),
    //     })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //         .then((response) => {
    //             return response.json();
    //         });
    // }

    function handleSignIn() {
        const URL = `${BACKEND_URL}/user/verify`;
        const contents = {
            email: email,
            password: password,
        };
        fetch(URL, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                authorizationToken: AUTHORIZATION_VALUE,
            },
            body: JSON.stringify(contents),
        })
            .catch((error) => {
                console.log(error);
            })
            .then((response) => {
                // console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Incorrect password or email");
                }
            })
            .then((data) => {
                console.log(data);
                setAuth(data);
                navigate("/");
            });
    }

    return (
        <div>
            <div className="relative flex flex-col bg-alternative h-screen">
                <NavBar></NavBar>
                <div className="flex flex-1 h-full">
                    {/* border-r border-default */}
                    <div className="flex flex-col items-center flex-1 flex-shrink-0 px-5 pt-16 pb-8">
                        <div className="flex justify-center items-center">
                            <div className="w-[25em]">
                                <h1 className="font-normal text-5xl text-secondary-foreground mb-3">
                                    Start planning!
                                </h1>
                                <h3 className="font-light text-base text-primary mb-5">
                                    Sign in to your account
                                </h3>

                                <h3 className="font-light text-base text-primary mb-2">
                                    Email
                                </h3>
                                <input
                                    className="w-full bg-slate-50 border shadow-sm p-2 px-3 rounded-md mb-2 text-sm"
                                    placeholder="yourname@example.com"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                ></input>

                                <h3 className="font-light text-base text-primary mb-2">
                                    Password
                                </h3>
                                <input
                                    className="w-full bg-slate-50 border shadow-sm p-2 px-3 mb-2 rounded-md text-sm"
                                    placeholder={`${blackCircle.repeat(6)}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                                <button
                                    onClick={() => handleSignIn()}
                                    className="w-full bg-[#e8d3f8] border shadow-sm p-2 px-3 rounded-md mb-2 text-sm hover:bg-[#e1c1f9]"
                                >
                                    Sign in
                                </button>
                                <h3 className="text-sm font-light mb-2 text-secondary-foreground">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/sign-up"
                                        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                                    >
                                        {" "}
                                        Sign up here!
                                    </Link>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
