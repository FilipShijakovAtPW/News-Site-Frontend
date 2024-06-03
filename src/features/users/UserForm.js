import { useState } from "react";
import { Form } from "../../components/Form";

export const UserForm = ({className, onCancel, onSubmit}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        onSubmit({username, email})
    }

    const formAreas = [
        {
            type: "text",
            name: "username",
            value: username,
            onChange(e) {
                setUsername(e.target.value);
            },
        },
        {
            type: "text",
            name: "email",
            value: email,
            onChange(e) {
                setEmail(e.target.value);
            },
        },
    ];

    return (
        <Form
            areas={formAreas}
            className={className}
            buttonText="Register User"
            onSubmit={handleSubmit}
            onCancel={onCancel}
        />
    );
};
