import { useDispatch, useSelector } from "react-redux";
import {
    resetStatus,
    selectArticles,
    selectChangePublishedArticleStatus,
    selectCreateArticleStatus,
    selectFetchArticlesStatus,
} from "./articlesSlice";
import { ArticleList } from "./ArticleList";
import { useEffect, useState } from "react";
import { useBackend } from "../../hooks/backend";
import { ArticleForm } from "./ArticleForm";
import { LoadingItem } from "../../components/LoadingItem";
import { isUserEditor, isUserWriter } from "../users/usersSlice";
import { ButtonForm } from "../../components/ButtonForm";

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
    const { doCreateArticle, doFetchArticles, changeArticlePublishedState } =
        useBackend();

    useEffect(() => {
        if (changePublishStateStatus.status === "error") {
            alert(changePublishStateStatus.error);
            dispatch(resetStatus("changePublishStateStatus"));
        }
    }, [changePublishStateStatus, dispatch]);

    useEffect(() => {
        if (createArticleStatus.status === "error") {
            alert(createArticleStatus.error);
            dispatch(resetStatus("createArticleStatus"));
        }
    }, [createArticleStatus, dispatch]);

    useEffect(() => {
        if (fetchArticlesStatus.status === "error") {
            alert(fetchArticlesStatus.error);
            dispatch(resetStatus("fetchArticlesStatus"));
        }
    }, [fetchArticlesStatus, dispatch]);

    useEffect(() => {
        if (!articles.hasFetched) {
            doFetchArticles({});
        }
    }, [doFetchArticles, articles]);

    const onSubmit = async ({ title, content, summary }) => {
        const response = await doCreateArticle({ title, content, summary });
        if (response.type.endsWith("fulfilled")) {
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
                        changeArticlePublishedState({ articleId: article.id })
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
        doFetchArticles({ page: page + 1 });
    };

    const onPrevPagination = () => {
        const { page } = articles;
        if (page === 1) {
            return;
        }
        doFetchArticles({ page: page - 1 });
    };

    const onSetFilters = (filters) => {
        doFetchArticles({ page: 1, filters });
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
