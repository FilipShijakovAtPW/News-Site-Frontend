import { useDispatch, useSelector } from "react-redux";
import { ArticleList } from "./ArticleList";
import { useEffect, useState } from "react";
import { ArticleForm } from "./ArticleForm";
import { LoadingItem } from "../../components/LoadingItem";
import { isUserEditor, isUserWriter } from "../users/usersSlice";
import { ButtonForm } from "../../components/ButtonForm";
import {
    selectArticles,
    selectFetchArticlesStatus,
    selectChangePublishedArticleStatus,
    selectCreateArticleStatus,
} from "../../data/selectors/selectors";
import {createArticle, fetchArticles, publishArticle, resetArticlesStatus} from "../../data/actions/articles"

export const AllArticles = () => {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const fetchArticlesStatus = useSelector(selectFetchArticlesStatus);
    const changePublishStateStatus = useSelector(
        selectChangePublishedArticleStatus,
    );
    const createArticleStatus = useSelector(selectCreateArticleStatus);

    const isWriter = useSelector(isUserWriter);
    const isEditor = useSelector(isUserEditor);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (changePublishStateStatus.status === "error") {
            alert(changePublishStateStatus.error);
            dispatch(resetArticlesStatus("changePublishStateStatus"));
        }
    }, [changePublishStateStatus, dispatch]);

    useEffect(() => {
        if (createArticleStatus.status === "error") {
            alert(createArticleStatus.error);
            dispatch(resetArticlesStatus("createArticleStatus"));
        }
    }, [createArticleStatus, dispatch]);

    useEffect(() => {
        if (fetchArticlesStatus.status === "error") {
            alert(fetchArticlesStatus.error);
            dispatch(resetArticlesStatus("fetchArticlesStatus"));
        }
    }, [fetchArticlesStatus, dispatch]);

    useEffect(() => {
        if (!articles.hasFetched) {
            dispatch(fetchArticles({}));
        }
    }, [articles, dispatch]);

    const onSubmit = async ({ title, content, summary }) => {
        const response = await dispatch(createArticle({ title, content, summary }));
        if (response.type.endsWith("SUCCESS")) {
            alert("Article created");
        }

        setShowForm(false);
    };

    const returnPublishButton = (article) => {
        return (
            isEditor && (
                <button
                    className={`btn ${article.isPublished ? "btn-danger" : "btn-primary"} ms-3`}
                    onClick={() =>
                        dispatch(publishArticle({ articleId: article.id }))
                    }
                    disabled={changePublishStateStatus.status === "loading"}
                >
                    {article.isPublished ? "Unpublish" : "Publish"}
                </button>
            )
        );
    };

    const onNextPagination = () => {
        const { page } = articles;
        dispatch(fetchArticles({ page: page + 1 }));
    };

    const onPrevPagination = () => {
        const { page } = articles;
        if (page === 1) {
            return;
        }
        dispatch(fetchArticles({ page: page - 1 }));
    };

    const onSetFilters = (filters) => {
        dispatch(fetchArticles({ page: 1, filters }));
    };

    return (
        <>
            {isWriter && (
                <ButtonForm
                    showForm={showForm}
                    triggerShowForm={() => setShowForm((prev) => !prev)}
                    showFormText="Create Article"
                    className="mb-3"
                >
                    <LoadingItem
                        className="w-50 mb-3"
                        isLoading={createArticleStatus.status === "loading"}
                    >
                        <ArticleForm
                            onCancel={() => setShowForm((prev) => !prev)}
                            onSubmit={onSubmit}
                        />
                    </LoadingItem>
                </ButtonForm>
            )}
            <ArticleList
                articles={articles.items}
                fetchStatus={fetchArticlesStatus.status}
                error={fetchArticlesStatus.error}
                elementsFunction={returnPublishButton}
                itemState={changePublishStateStatus}
                currentPagePagination={articles.page}
                onNextPagination={onNextPagination}
                onPrevPagination={onPrevPagination}
                disableNextPagination={articles.items.length < 10}
                setFilters={onSetFilters}
                filters={articles.filters}
            ></ArticleList>
        </>
    );
};
