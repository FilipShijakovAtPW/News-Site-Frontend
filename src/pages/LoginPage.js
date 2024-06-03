import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useBackend } from "../hooks/backend";
import { selectLoginStatus, resetStatus } from "../features/users/usersSlice";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { doLogin } = useBackend();
    const naviagete = useNavigate();
    const loginStatus = useSelector(selectLoginStatus);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (loginStatus.status === "error") {
            alert(loginStatus.error);
            setPassword("");
            dispatch(resetStatus("loginStatus"));
        }
        if (loginStatus.status === "success") {
            naviagete("/dashboard");
        }
    }, [loginStatus, naviagete, dispatch]);

    const handleLogin = (event) => {
        event.preventDefault();
        doLogin({ username, password });
    };

    return (
        <>
            <Link to={"/dashboard"}>Dashboard</Link>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="form-control"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loginStatus.status === "loading"}
                >
                    Submit
                </button>
            </form>
        </>
    );
};
