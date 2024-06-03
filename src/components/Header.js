import { useSelector } from "react-redux";
import { LoggedInUserStatus } from "../features/users/LoggedInUserStatus";
import {
    isUserAdmin,
    isUserEditor,
    isUserWriter,
} from "../features/users/usersSlice";
import { Link } from "react-router-dom";

export const Header = () => {
    const isAdmin = useSelector(isUserAdmin);
    const isWriter = useSelector(isUserWriter);
    const isEditor = useSelector(isUserEditor);

    let tabs = [];

    if (isAdmin || isWriter) {
        tabs.push(
            <Link key="all-articles" to="/dashboard/article">
                {isEditor ? "All Articles" : "Published Articles"}
            </Link>,
        );
    }

    if (isWriter) {
        tabs.push(
            <Link key="user-articles" to="/dashboard/user-article">
                My Articles
            </Link>,
        );
    }

    if (isAdmin) {
        tabs.push(
            <Link key="users" to="/dashboard/user">
                Users
            </Link>
        );
    }

    return (
        <div className="d-flex justify-content-between p-4">
            <h1>News site</h1>
            {tabs}
            <LoggedInUserStatus />
        </div>
    );
};
