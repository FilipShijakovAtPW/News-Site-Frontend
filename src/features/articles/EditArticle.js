import { useDispatch, useSelector } from "react-redux";
import { ArticleForm } from "./ArticleForm";
import { LoadingItem } from "../../components/LoadingItem";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { editArticle, resetArticlesStatus } from "../../data/actions/articles";
import { selectEditArticleStatus, selectSingleArticle } from "../../data/selectors/selectors";

export const EditArticle = () => {
    const dispatch = useDispatch();
    const { articleId } = useParams();
    const navigate = useNavigate();
    const editArticleStatus = useSelector(selectEditArticleStatus);

    useEffect(() => {
        if (editArticleStatus.status === "error") {
            alert(editArticleStatus.error);
            dispatch(resetArticlesStatus("editArticleStatus"));
        }
    }, [editArticleStatus, dispatch]);

    const article = useSelector((state) => selectSingleArticle(state, articleId));

    const onCancel = () => {
        navigate(-1);
    };

    const onSave = async ({ title, summary, content }) => {
        const response = await dispatch(editArticle({
            articleId,
            title,
            summary,
            content,
        }));
        if (response.type.endsWith("SUCCESS")) {
            alert("Article Eddited");
        }
        navigate(-1);
    };

    if (article) {
        return (
            <LoadingItem
                className="w-50"
                isLoading={editArticleStatus.status === "loading"}
            >
                <ArticleForm
                    onSubmit={onSave}
                    onCancel={onCancel}
                    preTitle={article.title}
                    preSummary={article.summary}
                    preContent={article.content}
                />
            </LoadingItem>
        );
    } else {
        <div>Article not found</div>;
    }
};
