export const dateFromStringExtractor = (dateString) => {
    const date = new Date(dateString);
    return date;
}

export const formatDate = (dateString) => {
    const date = dateFromStringExtractor(dateString);

    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`

    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`

    return `${day}/${month}/${date.getFullYear()}`;
}