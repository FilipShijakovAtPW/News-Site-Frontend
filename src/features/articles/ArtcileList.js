import { useDispatch, useSelector } from "react-redux"
import { fetchArticles, selectArticles } from "./articlesSlice";
import { ArticleItem } from "./ArticleItem";
import { Spinner } from "react-bootstrap";
import { useEffect } from "react";

export const ArticleList = () => {
    const dispatch = useDispatch();

    const articles = useSelector(selectArticles);
    const fetchStatus = useSelector((state) => state.articles.fetchStatus);
    const error = useSelector((state) => state.articles.error);

    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(fetchArticles());
        }
    }, [fetchStatus, dispatch])

    let content;

    if (fetchStatus === 'loading') {
        content = <Spinner text="Loading..." />
    } else if (fetchStatus === 'success') {
        content = articles.map(article => <ArticleItem key={article.id} article={article} />);
    } else if (fetchStatus === 'error') { 
        content = <div>{error}</div>
    }

    return content
    
}