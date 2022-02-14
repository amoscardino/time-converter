import { differenceInMinutes } from "date-fns";

const getHours = (t) => {
    let hours = 0;

    const times = (t || '').split(/\r?\n/ig).map(x => x.trim()).filter(x => x.length > 0);

    for (let time of times) {
        const regex = /(?<startHour>\d{1,2}):?(?<startMinutes>\d{2})?-(?<endHour>\d{0,2})?:?(?<endMinutes>\d{2})?/;
        const matches = time.match(regex);

        if (matches === null || matches.groups === undefined)
            return 0;

        let startHour = parseInt(matches.groups['startHour'] || '12');
        let startMinutes = parseInt(matches.groups['startMinutes'] || '0');
        let endHour = parseInt(matches.groups['endHour'] || startHour.toString());
        let endMinutes = parseInt(matches.groups['endMinutes'] || '0');

        if (endHour < startHour)
            endHour += 12;

        if (startHour === endHour && endMinutes === 0)
            endMinutes = startMinutes;

        // The year/month/day parameters are not important so long as they are the same for both
        const startDate = new Date(2000, 1, 0, startHour, startMinutes);
        const endDate = new Date(2000, 1, 0, endHour, endMinutes);

        hours += differenceInMinutes(endDate, startDate) / 60;
    }

    return hours;
};

export { getHours };
