export const timeHelper = (timeString: string) => {

    let splitTimeDay = timeString.split('T')[1];
    return splitTimeDay.split('+')[0];

};