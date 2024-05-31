import { useSelector } from "react-redux";
import { selectArticles } from "./articlesSlice";
import { ArticleItem } from "./ArticleItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export const SingleArticle = () => {
    const { articleId } = useParams();
    const navigate = useNavigate();

    const article = useSelector(selectArticles).find(
        (a) => a.id === Number(articleId),
    );

    if (article) {
        return (
            <>
                <div className="w-50">
                    <div className="btn" onClick={() => navigate(-1)}>Back</div>
                </div>
                <ArticleItem article={article} />
            </>
        );
    } else {
        return <Spinner />;
    }
};
