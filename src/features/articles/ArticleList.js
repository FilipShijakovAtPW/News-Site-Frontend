import { ArticleItem } from "./ArticleItem";
import { Link } from "react-router-dom";
import { ListingComponent } from "../../components/ListingComponent";
import { LoadingItem } from "../../components/LoadingItem";
import { Pagination } from "../../components/Pagination";
import { Filtering } from "../../components/Filtering";

export const ArticleList = ({
    articles,
    fetchStatus,
    error,
    elementsFunction,
    itemState,
    currentPagePagination,
    onPrevPagination,
    onNextPagination,
    disableNextPagination,
    filters,
    setFilters,
}) => {
    return (
        <>
            <Filtering filters={filters} setFilters={setFilters} />
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
                <Pagination
                    onPrev={onPrevPagination}
                    onNext={onNextPagination}
                    disableNext={disableNextPagination}
                    currentPage={currentPagePagination}
                />
            </ListingComponent>
        </>
    );
};
