import { useDispatch, useSelector } from "react-redux";
import { loggedOut, selectLoggedInUser, selectLoginStatus } from "./usersSlice";
import { Link } from "react-router-dom";

export const LoggedInUserStatus = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(selectLoggedInUser);
    const loginStatus = useSelector(selectLoginStatus);

    let content;

    if (
        loginStatus.status === "idle" || loginStatus.status === "error"
    ) {
        content = <Link to="/login">Login</Link>;
    } else if (loggedInUser == null && loginStatus.status === "loading") {
        content = <span>Logging in</span>;
    } else if (loginStatus.status === "success") {
        content = <>
        <span>{loggedInUser.username}</span>
        <button className="btn" onClick={() => dispatch(loggedOut())}>Log out</button>
        </>;
    }

    return <div>{content}</div>;
};
