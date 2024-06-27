export const selectArticles = (state) => state.articles.articles;

export const selectUserArticles = (state) => state.articles.userArticles;

export const selectSingleArticle = (state, articleId) =>
    [
        ...state.articles.articles.items,
        ...state.articles.userArticles.items,
    ].find((a) => a.id === articleId);

export const selectFetchArticlesStatus = (state) =>
    state.articles.fetchArticlesStatus;

export const selectFetchUserArticlesStatus = (state) =>
    state.articles.fetchUserArticlesStatus;

export const selectChangePublishedArticleStatus = (state) =>
    state.articles.changePublishedArticleStatus;

export const selectCreateArticleStatus = (state) =>
    state.articles.createArticleStatus;

export const selectEditArticleStatus = (state) =>
    state.articles.editArticleStatus;

export const selectLoggedInUser = (state) => state.users.loggedInAs;

export const selectUsers = (state) => state.users.users;

export const selectLoginStatus = (state) => state.users.loginStatus;

export const selectFetchUsersStatus = (state) => state.users.fetchUsersStatus;

export const selectCreateUserStatus = (state) => state.users.createUserStatus;

export const selectChangeRoleStatus = (state) => state.users.changeRoleStatus;

export const isUserAdmin = (state) =>
    state.users.loggedInAs?.roles.includes("ROLE_ADMIN");

export const isUserWriter = (state) =>
    state.users.loggedInAs?.roles.includes("ROLE_WRITER");

export const isUserEditor = (state) =>
    state.users.loggedInAs?.roles.includes("ROLE_EDITOR");