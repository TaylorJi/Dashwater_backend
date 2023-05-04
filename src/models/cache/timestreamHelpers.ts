export const floorToSecond = (timestring: string) => {
    const timeStringSplit = timestring.split('.');
    return timeStringSplit[0] + '.000Z';
};