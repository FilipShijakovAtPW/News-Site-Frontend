import { useSelector } from "react-redux";
import { ArticleItem } from "./ArticleItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isUserWriter, selectLoggedInUser, selectSingleArticle } from "../../data/selectors/selectors";

export const SingleArticle = () => {
    const { articleId } = useParams();
    const navigate = useNavigate();
    const isWriter = useSelector(isUserWriter);
    const loggedInUser = useSelector(selectLoggedInUser);

    const article = useSelector((state) =>
        selectSingleArticle(state, articleId),
    );

    if (article) {
        return (
            <>
                <div className="w-50">
                    <div className="btn" onClick={() => navigate(-1)}>
                        Back
                    </div>
                </div>
                <ArticleItem
                    className="m-3 w-50 position-relative"
                    article={article}
                >
                    {isWriter &&
                        loggedInUser.username === article.user.username && (
                            <Link
                                to={`/dashboard/article/${article.id}/edit`}
                                className="btn btn-secondary"
                            >
                                Edit
                            </Link>
                        )}
                </ArticleItem>
            </>
        );
    } else {
        return (
            <>
                <div className="w-50">
                    <div className="btn" onClick={() => navigate(-1)}>
                        Back
                    </div>
                </div>
                <div>Article not found</div>
            </>
        );
    }
};
