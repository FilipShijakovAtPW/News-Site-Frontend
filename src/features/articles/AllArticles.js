import { useSelector } from "react-redux";
import { selectArticles } from "./articlesSlice";
import { ArticleList } from "./ArticleList";
import { useEffect, useState } from "react";
import { useBackend } from "../../hooks/backend";

export const AllArticles = () => {
    const articles = useSelector(selectArticles);
    const fetchStatus = useSelector((state) => state.articles.fetchStatus);
    const error = useSelector((state) => state.articles.error);
    const { doFetchArticles } = useBackend();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        doFetchArticles();
    }, [doFetchArticles]);

    return (
        <ArticleList
            articles={articles}
            fetchStatus={fetchStatus}
            error={error}
        />
    );
};
