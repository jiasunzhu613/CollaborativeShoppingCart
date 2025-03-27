import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import App from "./App";

// note for react router: index simply points to the "/" path
createRoot(document.getElementById("root")).render(
    // Provide context
    // <BrowserRouter>
    //     <AuthProvider>
    //         <Routes>
    //             <Route
    //                 index
    //                 element={
    //                     <RedirectRoute>
    //                         <CartsHome />
    //                     </RedirectRoute>
    //                 }
    //             ></Route>
    //             <Route path="cart/:uuid" element={<CartView />}></Route>
    //             <Route path="user/:uuid" element={<User />}></Route>
    //             <Route path="sign-up" element={<SignUp />}></Route>
    //             <Route path="sign-in" element={<SignIn />}></Route>
    //         </Routes>
    //     </AuthProvider>
    // </BrowserRouter>
    <StrictMode>
        <App />
    </StrictMode>
);
