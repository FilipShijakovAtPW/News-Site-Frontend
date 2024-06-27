import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListingComponent } from "../../components/ListingComponent";
import { UserItem } from "./UserItem";
import { ButtonForm } from "../../components/ButtonForm";
import { UserForm } from "./UserForm";
import { LoadingItem } from "../../components/LoadingItem";
import { createUser, fetchUsers, resetUserStatus } from "../../data/actions/users";
import { selectCreateUserStatus, selectFetchUsersStatus, selectUsers } from "../../data/selectors/selectors";

export const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const fetchUsersStatus = useSelector(selectFetchUsersStatus);
    const createUserStatus = useSelector(selectCreateUserStatus);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!users.hasFetched) {
            dispatch(fetchUsers());
        }
    }, [users]);

    useEffect(() => {
        if (fetchUsersStatus.status === "error") {
            alert(fetchUsersStatus.error);
            dispatch(resetUserStatus("createUserStatus"));
        }
    }, [fetchUsersStatus, dispatch]);

    useEffect(() => {
        if (createUserStatus.status === "error") {
            alert(createUserStatus.error);
            dispatch(resetUserStatus("createUserStatus"));
        }
    }, [createUserStatus, dispatch]);

    const onSubmit = async ({ username, email }) => {
        await dispatch(createUser({ username, email }));
        setShowForm(false);
    };

    return (
        <>
            <ButtonForm
                showForm={showForm}
                triggerShowForm={() => setShowForm((prev) => !prev)}
                showFormText="Create User"
                className="mb-3"
            >
                <LoadingItem
                    isLoading={createUserStatus.status === "loading"}
                    className="mb-3 w-50"
                >
                    <UserForm
                        onCancel={() => setShowForm((prev) => !prev)}
                        onSubmit={onSubmit}
                    />
                </LoadingItem>
            </ButtonForm>
            <ListingComponent
                status={fetchUsersStatus.status}
                error={fetchUsersStatus.error}
            >
                {users.items.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </ListingComponent>
        </>
    );
};
