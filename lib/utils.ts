import { formatDistanceToNowStrict, parseISO } from 'date-fns';

export function shortTimeAgo(dateString: string): string {
    const distance = formatDistanceToNowStrict(parseISO(dateString))

    const mapping = {
        seconds: 's',
        second: 's',
        minutes: 'm',
        minute: 'm',
        hours: 'h',
        hour: 'h',
        days: 'd',
        day: 'd',
        weeks: 'w',
        week: 'w',
        months: 'mo',
        month: 'mo',
        years: 'y',
        year: 'y'
    }

    return distance
        .split(' ')
        .map(part => mapping[part as keyof typeof mapping] || part)
        .join('') + ' ago'
}