import { useSelector } from "react-redux";
import { selectArticles } from "./articlesSlice";
import { ArticleList } from "./ArticleList";
import { useEffect, useState } from "react";
import { useBackend } from "../../hooks/backend";
import { ArticleForm } from "./ArticleForm";
import { LoadingItem } from "../../components/LoadingItem";
import { isUserEditor, isUserWriter } from "../users/usersSlice";
import { ButtonForm } from "../../components/ButtonForm";

export const AllArticles = () => {
    const articles = useSelector(selectArticles);
    const fetchStatus = useSelector((state) => state.articles.fetchStatus);
    const changePublishStateStatus = useSelector(
        (state) => state.articles.changePublishStateStatus,
    );
    const createArticleState = useSelector(
        (state) => state.articles.createArticleState,
    );
    const isWriter = useSelector(isUserWriter);
    const isEditor = useSelector(isUserEditor);
    const error = useSelector((state) => state.articles.error);

    const [showForm, setShowForm] = useState(false);
    const { doCreateArticle, doFetchArticles, changeArticlePublishedState } =
        useBackend();

    useEffect(() => {
        if (changePublishStateStatus.state === "error") {
            alert(error);
        }
    }, [changePublishStateStatus, error]);

    useEffect(() => {
        doFetchArticles();
    }, [doFetchArticles]);

    const onSubmit = async ({ title, content, summary }) => {
        if (title && content && summary) {
            const response = await doCreateArticle({ title, content, summary });
            if (response.type.endsWith("fulfilled")) {
                alert("Article created");
            } else {
                alert("Creation unsuccessful");
            }

            setShowForm(false);
        }
    };

    const returnPublishButton = (article) => {
        return (
            isEditor && (
                <button
                    className={`btn ${article.isPublished ? "btn-danger" : "btn-primary"} ms-3`}
                    onClick={() =>
                        changeArticlePublishedState({ articleId: article.id })
                    }
                    disabled={changePublishStateStatus.state === "loading"}
                >
                    {article.isPublished ? "Unpublish" : "Publish"}
                </button>
            )
        );
    };

    return (
        <>
            {isWriter &&
                <ButtonForm showForm={showForm} triggerShowForm={() => setShowForm(prev => !prev)} showFormText="Create Article">
                    <LoadingItem
                        className="w-50"
                        isLoading={createArticleState === "loading"}
                    >
                        <ArticleForm
                            onCancel={() => setShowForm((prev) => !prev)}
                            onSubmit={onSubmit}
                        />
                    </LoadingItem>
                </ButtonForm>}
            <ArticleList
                articles={articles}
                fetchStatus={fetchStatus}
                error={error}
                elementsFunction={returnPublishButton}
                itemState={changePublishStateStatus}
            ></ArticleList>
        </>
    );
};
