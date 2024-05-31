import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../features/articles/articlesSlice";
import { selectLoggedInUser, logIn } from "../features/users/usersSlice";
import { useCallback } from "react";

export const useBackend = () => {
    const loggedInUser = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();

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

    return {
        doFetchArticles,
        doLogin,
        doFetchUserArticles,
    };
};
