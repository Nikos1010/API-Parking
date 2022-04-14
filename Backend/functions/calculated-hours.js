function calculatedHours(hours) {
    let result;
    if(hours <= 3) {
        result = 1
    } else if(hours <= 8) {
        result = hours - 2;
    } else {
        day = calculatedDays(hours);
        result = 19 * day;
    }
    return result;
}

function calculatedDays(days) {
    return result = Math.ceil(days/24);
}

exports.calculatedHours = calculatedHours;