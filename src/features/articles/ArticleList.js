import { Spinner } from "react-bootstrap";
import { ArticleItem } from "./ArticleItem";
import { Link } from "react-router-dom";

export const ArticleList = ({articles, fetchStatus, error}) => {
    let content;

    if (fetchStatus === "loading") {
        content = <Spinner text="Loading..." />;
    } else if (fetchStatus === "success") {
        content = articles.map((article) => (
            <ArticleItem key={article.id} article={article} shouldTrim={true}>
                <Link
                    to={`/dashboard/article/${article.id}`}
                    className="btn btn-secondary"
                >
                    View
                </Link>
            </ArticleItem>
        ));
    } else if (fetchStatus === "error") {
        content = <div>{error}</div>;
    }

    return content;
}