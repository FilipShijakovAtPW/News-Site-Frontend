import { formatDate } from "../../functions/dateFromStringExtractor";
import { trimText } from "../../functions/textTrimmer";

export const ArticleItem = ({ article, children, shouldTrim = false }) => {
    const date = formatDate(article.published);

    const title = shouldTrim ? trimText(article.title, 50) : article.title;
    const summary = shouldTrim
        ? trimText(article.summary, 80)
        : article.summary;
    const content = shouldTrim
        ? trimText(article.content, 200)
        : article.content;

    return (
        <div className="card m-3 w-50 position-relative ">
            <div className="position-absolute bottom-0 end-0 p-2">
                {article.isPublished ? "Published" : "Not Published"}
            </div>
            <div className="card-header d-flex justify-content-between">
                <span className="text-muted">{article.user.username}</span>{" "}
                <span>{date}</span>
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{summary}</h6>
                <p className="card-text">{content}</p>
                {children}
            </div>
        </div>
    );
};
