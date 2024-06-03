import { useDispatch, useSelector } from "react-redux";
import { changePublishedState, fetchArticles } from "../features/articles/articlesSlice";
import {
    selectLoggedInUser,
    logIn,
    fetchUsers,
    changeUserRole,
} from "../features/users/usersSlice";
import { useCallback } from "react";

export const useBackend = () => {
    const loggedInUser = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();

    const doFetchUsers = useCallback(() => {
        dispatch(fetchUsers({ token: loggedInUser.token }));
    }, [dispatch, loggedInUser]);

    const doFetchArticles = useCallback(() => {
        if (loggedInUser) {
            dispatch(fetchArticles({ token: loggedInUser.token }));
        } else {
            dispatch(fetchArticles({}));
        }
    }, [dispatch, loggedInUser]);

    const doFetchUserArticles = useCallback(() => {
        dispatch(
            fetchArticles({ token: loggedInUser.token, userArticles: true }),
        );
    }, [dispatch, loggedInUser]);

    const doLogin = async ({ username, password }) => {
        dispatch(logIn({ username, password }));
    };

    const assignRole = async ({ userId, role }) => {
        dispatch(
            changeUserRole({
                token: loggedInUser.token,
                userId,
                role,
                shouldAssign: true,
            }),
        );
    };

    const removeRole = async ({ userId, role }) => {
        dispatch(
            changeUserRole({
                token: loggedInUser.token,
                userId,
                role,
                shouldAssign: false,
            }),
        );
    };

    const changeArticlePublishedState = ({ articleId }) => {
        dispatch(changePublishedState({ token: loggedInUser.token, articleId }));
    };

    return {
        doFetchArticles,
        doLogin,
        doFetchUserArticles,
        doFetchUsers,
        assignRole,
        removeRole,
        changeArticlePublishedState,
    };
};
