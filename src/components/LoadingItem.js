import { Spinner } from "react-bootstrap";

export const LoadingItem = ({ children, isLoading, className }) => {
    return (
        <div className={`position-relative ${className}`}>
            {isLoading && (
                <div
                    className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        background: "rgba(0,0,0,0.3)",
                        zIndex: 100,
                    }}
                >
                    <Spinner />
                </div>
            )}
            {children}
        </div>
    );
};
