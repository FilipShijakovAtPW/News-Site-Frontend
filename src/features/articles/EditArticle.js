import { useDispatch, useSelector } from "react-redux";
import {
    resetStatus,
    selectEditArticleStatus,
    selectSingleArticle,
} from "./articlesSlice";
import { useBackend } from "../../hooks/backend";
import { ArticleForm } from "./ArticleForm";
import { LoadingItem } from "../../components/LoadingItem";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const EditArticle = () => {
    const dispatch = useDispatch();
    const { articleId } = useParams();
    const navigate = useNavigate();
    const { doEditArticle } = useBackend();
    const editArticleStatus = useSelector(selectEditArticleStatus);

    useEffect(() => {
        if (editArticleStatus.status === "error") {
            alert(editArticleStatus.error);
            dispatch(resetStatus("editArticleStatus"));
        }
    }, [editArticleStatus, dispatch]);

    const article = useSelector((state) => selectSingleArticle(state, articleId));

    const onCancel = () => {
        navigate(-1);
    };

    const onSave = async ({ title, summary, content }) => {
        const response = await doEditArticle({
            articleId,
            title,
            summary,
            content,
        });
        if (response.type.endsWith("fulfilled")) {
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
