import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { AllArticles } from "./features/articles/AllArticles";
import { SingleArticle } from "./features/articles/SingleArticle";
import { UserArticles } from "./features/articles/UserArticles";

function App() {
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
                            path="user-article"
                            element={<UserArticles />}
                        />
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
}

export default App;
