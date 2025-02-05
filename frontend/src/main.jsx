import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import CartsHome from "./CartsHome.jsx";
import CartView from "./CartView.jsx";

// note for react router: index simply points to the "/" path
createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<CartsHome />}></Route>
            <Route path="cart/:uuid" element={<CartView />}></Route>
        </Routes>
    </BrowserRouter>
    // <StrictMode>
    //     <App />
    // </StrictMode>
);
