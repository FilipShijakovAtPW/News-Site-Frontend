import { ArticleItem } from "./ArticleItem";
import { Link } from "react-router-dom";
import { ListingComponent } from "../../components/ListingComponent";
import { useBackend } from "../../hooks/backend";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { LoadingItem } from "../../components/LoadingItem";
import { isUserEditor } from "../users/usersSlice";

export const ArticleList = ({ articles, fetchStatus, error }) => {
    const { changeArticlePublishedState } = useBackend();
    const changePublishStateStatus = useSelector(
        (state) => state.articles.changePublishStateStatus,
    );
    const publishError = useSelector((state) => state.articles.error);
    const isEditor = useSelector(isUserEditor);

    useEffect(() => {
        if (changePublishStateStatus.state === "error") {
            alert(publishError);
        }
    }, [changePublishStateStatus, publishError]);

    const changePublishState = (articleId) => {
        changeArticlePublishedState({ articleId });
    };

    return (
        <ListingComponent error={error} status={fetchStatus}>
            {articles.map((article) => (
                <LoadingItem
                    className="card m-3 w-50 position-relative"
                    key={article.id}
                    isLoading={
                        changePublishStateStatus.state === "loading" &&
                        changePublishStateStatus.id === article.id
                    }
                >
                    <ArticleItem article={article} shouldTrim={true}>
                        <Link
                            to={`/dashboard/article/${article.id}`}
                            className="btn btn-secondary"
                        >
                            View
                        </Link>
                        {isEditor && (
                            <button
                                className={`btn ${article.isPublished ? 'btn-danger' : 'btn-primary'} ms-3`}
                                onClick={() => changePublishState(article.id)}
                                disabled={changePublishStateStatus.state === 'loading'}
                            >
                                {article.isPublished ? "Unpublish" : "Publish"}
                            </button>
                        )}
                    </ArticleItem>
                </LoadingItem>
            ))}
        </ListingComponent>
    );
};
