import { useState, useEffect, useContext } from "react";
import NavBar from "./components/NavBar";
import AuthContext from "./context/AuthProvider";
import { useParams } from "react-router";

function User() {
    const { auth } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});
    let { uuid } = useParams();
    const BACKEND_URL = import.meta.env.VITE_BACKEND;
    const AUTHORIZATION_VALUE = import.meta.env.AUTHORIZATION_VALUE;

    useEffect(() => {
        function getUserInfo() {
            const URL = `${BACKEND_URL}/user/${uuid}`;
            return fetch(URL, {
                method: "GET",
                // credentials: "include",
                headers: {
                    authorizationToken: AUTHORIZATION_VALUE,
                },
            })
                .catch((error) => {
                    console.log(error);
                })
                .then((response) => {
                    console.log(response.ok);
                    if (response.ok) return response.json();
                })
                .then((data) => {
                    setUserInfo(data);
                    console.log(data);
                });
        }
        getUserInfo();
    }, [BACKEND_URL, uuid]);

    return auth?.session_id ? (
        <div>
            <NavBar></NavBar>
            <div className="flex flex-1 h-full justify-center">
                <div className="flex flex-col items-center flex-1 flex-shrink-0 pt-16">
                    {/* <div className="flex justify-center items-center"> */}
                    <div>
                        <h1 className="text-5xl font-black">
                            {userInfo?.first_name} {userInfo?.last_name}
                        </h1>
                        <h1 className="text-1xl font-medium">
                            {userInfo?.email}
                        </h1>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    ) : null;
}

export default User;
