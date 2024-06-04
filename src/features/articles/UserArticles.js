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
            doFetchUserArticles({});
        }
    }, [articles, doFetchUserArticles]);

    useEffect(() => {
        if (fetchStatus.status === "error") {
            alert(fetchStatus.error);
            dispatch(resetStatus("fetchUserArticlesStatus"));
        }
    }, [fetchStatus, dispatch]);

    const onNextPagination = () => {
        const { page } = articles;
        doFetchUserArticles({ page: page + 1 });
    };

    const onPrevPagination = () => {
        const { page } = articles;
        if (page === 1) {
            return;
        }
        doFetchUserArticles({ page: page - 1 });
    };

    const onSetFilters = (filters) => {
        doFetchUserArticles({ page: 1, filters });
    };

    return (
        <ArticleList
            articles={articles.items}
            fetchStatus={fetchStatus.status}
            error={fetchStatus.error}
            currentPagePagination={articles.page}
            onNextPagination={onNextPagination}
            onPrevPagination={onPrevPagination}
            disableNextPagination={articles.items.length < 10}
            setFilters={onSetFilters}
            filters={articles.filters}
        />
    );
};
