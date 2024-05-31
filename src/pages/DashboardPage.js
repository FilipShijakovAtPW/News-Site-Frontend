import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";

export const DashboardPage = () => {
    return (
        <>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <Outlet />
            </div>
        </>
    );
};
