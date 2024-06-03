import { useDispatch, useSelector } from "react-redux";
import {
    changePublishedState,
    createArticle,
    editArticle,
    fetchArticles,
} from "../features/articles/articlesSlice";
import {
    selectLoggedInUser,
    logIn,
    fetchUsers,
    changeUserRole,
    createUser,
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
        dispatch(
            changePublishedState({ token: loggedInUser.token, articleId }),
        );
    };

    const doCreateArticle = ({ title, content, summary }) => {
        return dispatch(
            createArticle({
                title,
                summary,
                content,
                token: loggedInUser.token,
            }),
        );
    };

    const doEditArticle = ({ articleId, title, content, summary }) => {
        return dispatch(
            editArticle({
                articleId,
                title,
                summary,
                content,
                token: loggedInUser.token,
            }),
        );
    };

    const doCreateUser = ({ username, email }) => {
        return dispatch(
            createUser({ token: loggedInUser.token, username, email }),
        );
    };

    return {
        doFetchArticles,
        doLogin,
        doFetchUserArticles,
        doFetchUsers,
        assignRole,
        removeRole,
        changeArticlePublishedState,
        doCreateArticle,
        doEditArticle,
        doCreateUser,
    };
};
