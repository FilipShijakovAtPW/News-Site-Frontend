import { useState } from "react";
import { Form } from "../../components/Form";

export const ArticleForm = ({
    preTitle = "",
    preSummary = "",
    preContent = "",
    className = "",
    onCancel,
    onSubmit,
}) => {
    const [title, setTitle] = useState(preTitle);
    const [summary, setSummary] = useState(preSummary);
    const [content, setContent] = useState(preContent);

    const handleSubmit = () => {
        onSubmit({ title, summary, content });
    };

    const formAreas = [
        {
            type: "text",
            name: "title",
            value: title,
            onChange(e) {
                setTitle(e.target.value);
            },
        },
        {
            type: "text",
            name: "summary",
            value: summary,
            onChange(e) {
                setSummary(e.target.value);
            },
        },
        {
            type: "textarea",
            name: "content",
            value: content,
            onChange(e) {
                setContent(e.target.value);
            },
        },
    ];

    return (
        <Form
            areas={formAreas}
            className={className}
            buttonText="Create Article"
            onSubmit={handleSubmit}
            onCancel={onCancel}
        />
    );
};
