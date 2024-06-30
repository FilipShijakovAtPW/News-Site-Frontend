import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { mergeWith, isArray } from "lodash";

export const DashboardPage = () => {
    const obj = {
        // employees: {
        //     1: {
        //         id: "1",
        //         name: "Filip",
        //     },
        //     2: {
        //         id: "2",
        //         name: "Kristijan",
        //     },
        // },
        employees: [
            {
                id: "1",
                name: "Filip",
            },
            {
                id: "2",
                name: "Kristijan",
            },
        ]
    };

    const src = {
        // employees: {
        //     2: {
        //         id: "2",
        //         name: "Kristijan",
        //     },
        //     3: {
        //         id: "3",
        //         name: "Ilina",
        //     },
        // },
        employees: [
            {
                id: "2",
                name: "Kristijan",
            },
            {
                id: "3",
                name: "Ilina",
            },
        ]
    };

    const combined = mergeWith(
        {},
        obj,
        src,
        (objValue, srcValue, key) => {
            if (key === "includes") {
                return;
            }

            if (isArray(objValue)) {
                return srcValue;
            }
        }
    );

    console.log(combined);

    return (
        <>
            <Header />
            <div className="d-flex flex-column align-items-center">
                <Outlet />
            </div>
        </>
    );
};
