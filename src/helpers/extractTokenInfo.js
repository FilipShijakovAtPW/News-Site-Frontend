export const extractTokenInfo = (token) => {
    const encodedTokenInfo = token.split(".")[1];

    const decodedTokenInfo = atob(encodedTokenInfo);

    const tokenInfo = JSON.parse(decodedTokenInfo);

    return [tokenInfo.username, tokenInfo.roles, token]
}