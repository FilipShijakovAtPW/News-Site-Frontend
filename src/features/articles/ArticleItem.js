import { formatDate } from "../../functions/dateFromStringExtractor"
import { trimText } from "../../functions/textTrimmer";

export const ArticleItem = ({article}) => {

    const date = formatDate(article.published);

    return <div className="card m-3 w-50">
        <div className="card-header">
            <span className="text-muted">{article.user.username}</span> {date}
        </div>
        <div className="card-body">
            <h5 className="card-title">{trimText(article.title, 50)}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{trimText(article.summary, 80)}</h6>
            <p className="card-text">{trimText(article.content, 200)}</p>
        </div>
    </div>
}