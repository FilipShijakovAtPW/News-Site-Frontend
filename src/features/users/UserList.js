import { useEffect, useState } from "react";
import { useBackend } from "../../hooks/backend";
import { useSelector } from "react-redux";
import { ListingComponent } from "../../components/ListingComponent";
import { UserItem } from "./UserItem";
import { ButtonForm } from "../../components/ButtonForm";
import { UserForm } from "./UserForm";

export const UserList = () => {
    const { doFetchUsers, doCreateUser } = useBackend();
    const users = useSelector((state) => state.users.users);
    const fetchUsersState = useSelector((state) => state.users.fetchUsersState);
    const error = useSelector((state) => state.users.error);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (fetchUsersState === "idle") {
            doFetchUsers();
        }
    }, [fetchUsersState, doFetchUsers]);

    useEffect(() => {
        if (fetchUsersState === "idle") {
            doFetchUsers();
        }
    }, [fetchUsersState, doFetchUsers]);

    const onSubmit = async ({username, email}) => {
        const response = await doCreateUser({username, email});
        if (response.type.endsWith('rejected')) {
            alert("Creation unsuccessful");
        }
        setShowForm(false);
    }

    return (
        <>
        <ButtonForm showForm={showForm} triggerShowForm={() => setShowForm(prev => !prev)} showFormText="Create User" className="mb-3" >
            <UserForm onCancel={() => setShowForm(prev => !prev)} onSubmit={onSubmit} className="mb-3 w-50" />
        </ButtonForm>
        <ListingComponent status={fetchUsersState} error={error}>
            {users.map((user) => (
                <UserItem key={user.id} user={user} />
            ))}
        </ListingComponent>
        </>
        
    );
};
