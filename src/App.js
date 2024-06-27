import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { AllArticles } from "./features/articles/AllArticles";
import { SingleArticle } from "./features/articles/SingleArticle";
import { UserArticles } from "./features/articles/UserArticles";
import { UserList } from "./features/users/UserList";
import { EditArticle } from "./features/articles/EditArticle";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { setToken } from "./data/actions/users";
import { loadToken } from "./helpers/tokenStorage";

function App() {

    // const [tokenLoaded, setTokenLoaded] = useState(false);
    const [tokenLoaded, setTokenLoaded] = useState(true);

    // useEffect(() => {
    //     const getToken = async () => {
    //         const token = loadToken();
    //         if (token) {
    //             setToken(token);
    //         }
    //     };

    //     getToken().then(() => setTokenLoaded(true));
    // }, []);

    if (tokenLoaded){
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/dashboard" element={<DashboardPage />}>
                            <Route path="article" element={<AllArticles />} />
                            <Route
                                path="article/:articleId"
                                element={<SingleArticle />}
                            />
                            <Route
                                path="article/:articleId/edit"
                                element={<EditArticle />}
                            />
                            <Route path="user-article" element={<UserArticles />} />
                            <Route path="user" element={<UserList />} />
                            <Route
                                path=""
                                element={
                                    <Navigate replace to={"/dashboard/article"} />
                                }
                            />
                        </Route>
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    } else {
        return <Spinner />
    }
    
}

export default App;
