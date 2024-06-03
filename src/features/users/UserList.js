import { useEffect } from "react";
import { useBackend } from "../../hooks/backend";
import { useSelector } from "react-redux";
import { ListingComponent } from "../../components/ListingComponent";
import { UserItem } from "./UserItem";

export const UserList = () => {
    const { doFetchUsers } = useBackend();
    const users = useSelector((state) => state.users.users);
    const fetchUsersState = useSelector((state) => state.users.fetchUsersState);
    const error = useSelector((state) => state.users.error);

    useEffect(() => {
        if (fetchUsersState === "idle") {
            doFetchUsers();
        }
    }, [fetchUsersState, doFetchUsers]);

    return (
        <ListingComponent status={fetchUsersState} error={error}>
            {users.map((user) => (
                <UserItem key={user.id} user={user} />
            ))}
        </ListingComponent>
    );
};
