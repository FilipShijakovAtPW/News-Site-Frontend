import { useSelector } from "react-redux";
import { selectArticles } from "./articlesSlice";
import { useBackend } from "../../hooks/backend";
import { ArticleForm } from "./ArticleForm";
import { LoadingItem } from "../../components/LoadingItem";
import { useNavigate, useParams } from "react-router-dom";

export const EditArticle = () => {
    const { articleId } = useParams();
    const navigate = useNavigate();
    const { doEditArticle } = useBackend();
    const editArticleState = useSelector(state => state.articles.editArticleState);

    const article = useSelector(selectArticles).find(
        (a) => a.id === Number(articleId),
    );

    const onCancel = () => {
        console.log('here')
        navigate(-1);
    };

    const onSave = async ({ title, summary, content }) => {
        console.log('jfdhjhdasfjifhasdui')
        const response = await doEditArticle({
            articleId,
            title,
            summary,
            content,
        });
        if (response.type.endsWith("fulfilled")) {
            alert("Article Eddited");
        } else {
            alert("Error while edditing article");
        }
        navigate(-1);
    };

    if (article) {
        return (
            <LoadingItem className="w-50" isLoading={editArticleState === 'loading'}>
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
