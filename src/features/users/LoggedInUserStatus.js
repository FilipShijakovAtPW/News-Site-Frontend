import { useSelector } from "react-redux";
import { selectLoggedInUser } from "./usersSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const LoggedInUserStatus = () => {
    const loggedInUser = useSelector(selectLoggedInUser);
    const loginState = useSelector((state) => state.users.loggingInState);
    const errorMessage = useSelector((state) => state.users.error);

    useEffect(() => {
        if (loginState === "error") {
            alert(`Login failed: ${errorMessage}`);
        }
    }, [loginState, errorMessage]);

    let content;

    if (
        loggedInUser == null &&
        (loginState === "idle" || loginState === "error")
    ) {
        content = <Link to="/login">Login</Link>;
    } else if (loggedInUser == null && loginState === "loading") {
        content = <span>Logging in</span>;
    } else if (loginState === "success") {
        content = <span>{loggedInUser.username}</span>;
    }

    return <div>{content}</div>;
};
