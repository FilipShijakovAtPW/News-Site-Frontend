export const ButtonForm = ({ children, showFormText = "Show Form", showForm, triggerShowForm, className }) => {

    return showForm ? (
        children
    ) : (
        <button
            className={`btn btn-primary ${className}`}
            onClick={() => triggerShowForm()}
        >
            {showFormText}
        </button>
    );
};
