import { capitalizeFirstLetter } from "../functions/capitalizeFirstLetter";

export const Form = ({ areas, className, buttonText, onSubmit, onCancel }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    }

    const content = areas.map((area) => {
        const name = area.name.toLowerCase();
        const { type, value, onChange } = area;
        if (type === "text") {
            return (
                <div key={name} className="form-group mb-3">
                    <label htmlFor={name}>{capitalizeFirstLetter(name)}</label>
                    <input
                        className="form-control"
                        id={name}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            );
        }
        // Textarea
        else {
            return (
                <div key={name} className="form-group mb-3">
                    <label htmlFor={name}>Content</label>
                    <textarea
                        className="form-control"
                        id={name}
                        rows="3"
                        onChange={onChange}
                        value={value}
                    />
                </div>
            );
        }
    });

    return (
        <div className={`card p-3 ${className}`}>
            <form onSubmit={handleSubmit}>
                {content}
                <input
                    className="btn btn-primary"
                    type="submit"
                    value={buttonText}
                />
                <button className="btn btn-secondary ms-3" type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};
