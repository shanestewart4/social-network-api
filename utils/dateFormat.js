const addDateSuffix = date => {
    let dateString = date.toString();

    const lastCharacters = date.charAt(dateString.length -1);
    if (lastCharacters === '1'&& dateString !== '11') {
        dateString = `${dateString}st`;
    } else if (lastCharacters === '2'&& dateString !== '12') {
        dateString = `${dateString}nd`;
    } else if (lastCharacters === '3'&& dateString !== '13') {
        dateString = `${dateString}rd`;
    } else {
        dateString = `${dateString}th`;
    }
    
    return dateString;
};

// module exports

module.exports = ( timestamp, {monthLength = 'short', dateSuffix = true} = {} ) => {
    let months;
    if (monthLength === 'short') {
        months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'

        };
    } else {
        months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'

        };
    }

    const dateObject = new Date(timestamp);
    const formatMonth = months[dateObject.getMonth()];

    let dayMonth;

    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dateObject.getDate);
    } else {
        dayOfMonth = dateObject.getDate();
    }
    const year = dateObject.getFullYear();
    let hr;
    if (dateObject.getHours > 12) {
        hour = Math.floor(dateObject.getHours()/2)
    } else {
        hr = dateObject.getHours();
    }
    // midnight
    if (hr === 0) {
        hr = 12;
    }

    const minutes = dateObject.getMinutes();

    let amOrPm;

    if (dateObject.getHours() >= 12) {
        amOrPm = 'pm';
    } else {
        amOrPm = 'am'
    }

    const formattedTimeandDate = `${formatMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${amOrPm}`;
    return formattedTimeandDate;

}