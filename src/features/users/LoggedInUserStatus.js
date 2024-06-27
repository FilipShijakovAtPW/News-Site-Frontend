import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectLoggedInUser, selectLoginStatus } from "../../data/selectors/selectors";
import { logout } from "../../data/actions/users";

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
        <button className="btn" onClick={() => dispatch(logout())}>Log out</button>
        </>;
    }

    return <div>{content}</div>;
};
