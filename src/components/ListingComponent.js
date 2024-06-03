import { Spinner } from "react-bootstrap";

export const ListingComponent = ({ status, error, children }) => {
    let content;

    if (status === "loading") {
        content = <Spinner text="Loading..." />;
    } else if (status === "success") {
        content = children;
    } else if (status === "error") {
        content = <div>{error}</div>;
    }

    return content;
};
