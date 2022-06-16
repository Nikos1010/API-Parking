export function calculatedHours(hours, priceHour, priceDay) {
    let result;
    if(hours <= 3) {
        return result = 1 * priceHour;
    } else if(hours <= 8) {
        return result = (hours - 2) * priceHour;
    } else {
        result = calculatedDays(hours, priceDay);
        return result;
    }
}

function calculatedDays(days, priceDay) {
    let result
    if(days > 24) {
        return result = Math.ceil(days / 24) * priceDay;
    } else{
        return result = 1 * priceDay;
    }
}
