export const compareDateStrings = (dateString1: string, dateString2: string): number => {
    const getDateParts = (dateString: string): number[] => {
        const parts = dateString.split('-');
        if (parts.length === 1) {
            // Only year provided
            return [1, 1, parseInt(parts[0])];
        } else if (parts.length === 2) {
            // Month and year provided
            return [1, parseInt(parts[0]), parseInt(parts[1])];
        } else {
            // Day, month, and year provided
            return [parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2])];
        }
    };

    const [day1, month1, year1] = getDateParts(dateString1);
    const [day2, month2, year2] = getDateParts(dateString2);

    const date1 = new Date(year1, month1 - 1, day1);
    const date2 = new Date(year2, month2 - 1, day2);

    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    } else {
        return 0;
    }
}

export const compareStrings = (string1: string, string2: string): number => {
    return string1.toLowerCase().localeCompare(string2.toLowerCase());
}

