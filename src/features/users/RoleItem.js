export const RoleItem = ({ role, isAdd = false, onRoleClicked, disabled }) => {
    return (
        <div className="card p-1 me-2 d-flex flex-row align-items-center">
            <small>{role}</small>
            <button className="btn p-0 ms-2 me-2" disabled={disabled} onClick={() => onRoleClicked(role)}>{isAdd ? '+' : '-'}</button>
        </div>
    );
};
