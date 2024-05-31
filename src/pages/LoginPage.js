import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useBackend } from "../hooks/backend";

export const LoginPage = () => {
    const { doLogin } = useBackend();
    const naviagete = useNavigate();
    const loginState = useSelector((state) => state.users.loggingInState);
    const loginError = useSelector((state) => state.users.error);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (loginState === "error") {
            alert(loginError);
            setPassword("");
        }
        if (loginState === "success") {
            naviagete("/dashboard");
        }
    }, [loginState, loginError, naviagete]);

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
                    disabled={loginState === "loading"}
                >
                    Submit
                </button>
            </form>
        </>
    );
};
