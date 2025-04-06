import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(1);
    const BACKEND_URL = import.meta.env.VITE_BACKEND;
    const AUTHORIZATION_VALUE = import.meta.env.VITE_AUTHORIZATION_VALUE; // REMEMBER TO HAVE THE VITE_ PREFIX!!!
    console.log("auth value:", AUTHORIZATION_VALUE);
    const navigate = useNavigate();

    useEffect(() => {
        async function verifySession() {
            console.log(auth?.session_id);
            if (auth?.session_id) return;
            setLoading(() => 1);
            const URL = `${BACKEND_URL}/session/verify-session`;
            return fetch(URL, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "authorizationToken": AUTHORIZATION_VALUE,
                },
            })
                .catch((error) => {
                    console.log(error);
                })
                .then((response) => {
                    // console.log(response.ok);
                    if (response.ok) return response.json();
                    // } else navigate("/sign-in");
                })
                .then((data) => {
                    setAuth(() => data);
                    setLoading(() => 0);
                    // console.log(auth["session_id"]);
                });
        }
        verifySession();
    }, [auth, BACKEND_URL, navigate]);

    console.log(loading);
    if (loading) return null;

    return (
        <AuthContext.Provider value={{ loading, setLoading, auth, setAuth }}>
            {!loading ? children : null}
        </AuthContext.Provider>
    );
}

export default AuthContext;
