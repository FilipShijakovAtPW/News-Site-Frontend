import { useEffect, useState } from "react";
import { useBackend } from "../../hooks/backend";
import { useDispatch, useSelector } from "react-redux";
import { ListingComponent } from "../../components/ListingComponent";
import { UserItem } from "./UserItem";
import { ButtonForm } from "../../components/ButtonForm";
import { UserForm } from "./UserForm";
import {
    selectCreateUserStatus,
    selectFetchUsersStatus,
    selectUsers,
} from "./usersSlice";
import { resetStatus } from "../users/usersSlice";
import { LoadingItem } from "../../components/LoadingItem";

export const UserList = () => {
    const dispatch = useDispatch();
    const { doFetchUsers, doCreateUser } = useBackend();
    const users = useSelector(selectUsers);
    const fetchUsersStatus = useSelector(selectFetchUsersStatus);
    const createUserStatus = useSelector(selectCreateUserStatus);

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!users.hasFetched) {
            doFetchUsers();
        }
    }, [users, doFetchUsers]);

    useEffect(() => {
        if (fetchUsersStatus.status === "error") {
            alert(fetchUsersStatus.error);
            dispatch(resetStatus("createUserStatus"));
        }
    }, [fetchUsersStatus, dispatch]);

    useEffect(() => {
        if (createUserStatus.status === "error") {
            alert(createUserStatus.error);
            dispatch(resetStatus("createUserStatus"));
        }
    }, [createUserStatus, dispatch]);

    const onSubmit = async ({ username, email }) => {
        await doCreateUser({ username, email });
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
