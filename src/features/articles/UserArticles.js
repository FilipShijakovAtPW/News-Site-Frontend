import { useEffect } from "react";
import { ArticleList } from "./ArticleList";
import { useDispatch, useSelector } from "react-redux";
import { selectFetchUserArticlesStatus, selectUserArticles } from "../../data/selectors/selectors";
import { fetchUserArticles, resetArticlesStatus } from "../../data/actions/articles";

export const UserArticles = () => {
    const dispatch = useDispatch();
    const articles = useSelector(selectUserArticles);
    const fetchStatus = useSelector(selectFetchUserArticlesStatus);

    useEffect(() => {
        if (!articles.hasFetched) {
            dispatch(fetchUserArticles({}));
        }
    }, [articles, dispatch]);

    useEffect(() => {
        if (fetchStatus.status === "error") {
            alert(fetchStatus.error);
            dispatch(resetArticlesStatus("fetchUserArticlesStatus"));
        }
    }, [fetchStatus, dispatch]);

    const onNextPagination = () => {
        const { page } = articles;
        dispatch(fetchUserArticles({ page: page + 1 }));
    };

    const onPrevPagination = () => {
        const { page } = articles;
        if (page === 1) {
            return;
        }
        dispatch(fetchUserArticles({ page: page - 1 }));
    };

    const onSetFilters = (filters) => {
        dispatch(fetchUserArticles({ page: 1, filters }));
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
