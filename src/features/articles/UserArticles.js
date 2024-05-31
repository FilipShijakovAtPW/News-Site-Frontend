import { useEffect } from "react";
import { useBackend } from "../../hooks/backend";
import { useSelector } from "react-redux";
import {
    selectArticles,
    selectFetchStatus,
    selectError,
} from "./articlesSlice";
import { ArticleList } from "./ArticleList";

export const UserArticles = () => {
    const { doFetchUserArticles } = useBackend();
    const articles = useSelector(selectArticles);
    const fetchStatus = useSelector(selectFetchStatus);
    const error = useSelector(selectError);

    useEffect(() => {
        doFetchUserArticles();
    }, [doFetchUserArticles]);

    return <ArticleList articles={articles} fetchStatus={fetchStatus} error={error} />
};
