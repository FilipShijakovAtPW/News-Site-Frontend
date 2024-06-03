import { ArticleItem } from "./ArticleItem";
import { Link } from "react-router-dom";
import { ListingComponent } from "../../components/ListingComponent";
import { LoadingItem } from "../../components/LoadingItem";

export const ArticleList = ({
    articles,
    fetchStatus,
    error,
    elementsFunction,
    itemState,
}) => {
    return (
        <ListingComponent error={error} status={fetchStatus}>
            {articles.map((article) => (
                <LoadingItem
                    className="m-3 w-50"
                    key={article.id}
                    isLoading={
                        itemState &&
                        itemState.status === "loading" &&
                        itemState.id === article.id
                    }
                >
                    <ArticleItem article={article} shouldTrim={true}>
                        <Link
                            to={`/dashboard/article/${article.id}`}
                            className="btn btn-secondary"
                        >
                            View
                        </Link>
                        {elementsFunction && elementsFunction(article)}
                    </ArticleItem>
                </LoadingItem>
            ))}
        </ListingComponent>
    );
};
