export const Pagination = ({ currentPage, onNext, onPrev, disableNext }) => {
    return (
        <div className="d-flex flex-row justify-content-center align-items-center w-50">
            <button
                className="btn me-5"
                disabled={currentPage === 1}
                onClick={onPrev}
            >
                Prev
            </button>
            <div>{currentPage}</div>
            <button className="btn ms-5" disabled={disableNext} onClick={onNext}>
                Next
            </button>
        </div>
    );
};
