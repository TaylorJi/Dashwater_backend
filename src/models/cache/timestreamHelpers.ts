export const floorToSecond = (timestring: string) => {
    const timeStringSplit = timestring.split('.');
    return timeStringSplit[0] + '.000Z';
};

export const formatTSTime = (timestring: string) => {
    return timestring.substring(0, 23);
};