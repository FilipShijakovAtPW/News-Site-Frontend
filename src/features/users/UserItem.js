import { useDispatch, useSelector } from "react-redux";
import { RoleItem } from "./RoleItem";
import { LoadingItem } from "../../components/LoadingItem";
import { useEffect } from "react";
import { selectChangeRoleStatus } from "../../data/selectors/selectors";
import {
    assignRole,
    removeRole,
    resetUserStatus,
} from "../../data/actions/users";

export const UserItem = ({ user }) => {
    const dispatch = useDispatch();
    const changeRoleStatus = useSelector(selectChangeRoleStatus);

    useEffect(() => {
        if (changeRoleStatus.status === "error") {
            alert(changeRoleStatus.error);
            dispatch(resetUserStatus("changeRoleStatus"));
        }
    }, [changeRoleStatus]);

    const unassignedRoles = ["ROLE_ADMIN", "ROLE_EDITOR", "ROLE_WRITER"].filter(
        (role) => !user.roles.includes(role),
    );

    const onAssignRole = (role) => {
        dispatch(assignRole({ userId: user.id, role }));
    };

    const onRemoveRole = (role) => {
        dispatch(removeRole({ userId: user.id, role }));
    };

    return (
        <LoadingItem
            className="w-50 mb-4 border"
            isLoading={
                changeRoleStatus.status === "loading" &&
                changeRoleStatus.userId === user.id
            }
        >
            <div className="p-4">
                <div className="d-flex justify-content-between mb-5">
                    <span>
                        <h3>{user.username}</h3>
                        <h6>{user.email}</h6>
                    </span>

                    <span>
                        {user.isConfirmed ? "Confirmed" : "Not Confirmed"}
                    </span>
                </div>

                <div className="d-flex">
                    {user.roles.map((role) => (
                        <RoleItem
                            key={role}
                            role={role}
                            onRoleClicked={onRemoveRole}
                            disabled={changeRoleStatus.status === "loading"}
                        />
                    ))}
                </div>
            </div>
            {unassignedRoles.length !== 0 && (
                <div className="border-top p-2">
                    <small>Assign roles</small>
                    <div className="d-flex mt-2">
                        {unassignedRoles.map((role) => (
                            <RoleItem
                                key={role}
                                role={role}
                                isAdd={true}
                                onRoleClicked={onAssignRole}
                                disabled={changeRoleStatus.status === "loading"}
                            />
                        ))}
                    </div>
                </div>
            )}
        </LoadingItem>
    );
};
