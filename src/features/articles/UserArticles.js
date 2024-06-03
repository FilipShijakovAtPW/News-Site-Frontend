import { useEffect } from "react";
import { useBackend } from "../../hooks/backend";
import { useDispatch, useSelector } from "react-redux";
import {
    resetStatus,
    selectFetchUserArticlesStatus,
    selectUserArticles,
} from "./articlesSlice";
import { ArticleList } from "./ArticleList";

export const UserArticles = () => {
    const dispatch = useDispatch();
    const { doFetchUserArticles } = useBackend();
    const articles = useSelector(selectUserArticles);
    const fetchStatus = useSelector(selectFetchUserArticlesStatus);

    useEffect(() => {
        if (!articles.hasFetched) {
            doFetchUserArticles();
        }
    }, [articles, doFetchUserArticles]);

    useEffect(() => {
        if (fetchStatus.status === 'error') {
            alert(fetchStatus.error);
            dispatch(resetStatus('fetchUserArticlesStatus'))
        }
    }, [fetchStatus, dispatch])

    return (
        <ArticleList
            articles={articles.items}
            fetchStatus={fetchStatus.status}
            error={fetchStatus.error}
        />
    );
};
