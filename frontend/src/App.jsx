import { BrowserRouter, Routes, Route } from "react-router";
import CartsHome from "./CartsHome.jsx";
import CartView from "./CartView.jsx";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import User from "./User.jsx";
import RedirectRoute from "./RedirectRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route
                        index
                        element={
                            <RedirectRoute>
                                <CartsHome />
                            </RedirectRoute>
                        }
                    ></Route>
                    <Route
                        path="cart/:uuid"
                        element={
                            // <RedirectRoute>
                            //     <CartView />
                            // </RedirectRoute>
                            <CartView />
                        }
                    ></Route>
                    <Route
                        path="user/:uuid"
                        element={
                            <RedirectRoute>
                                <User />
                            </RedirectRoute>
                        }
                    ></Route>
                    <Route path="sign-up" element={<SignUp />}></Route>
                    <Route path="sign-in" element={<SignIn />}></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
