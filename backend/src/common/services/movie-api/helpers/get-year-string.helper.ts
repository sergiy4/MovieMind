// date form: '2006-10-01'
const getYearString = (date: string | undefined): string => {
    return date?.slice(0, 4) || '';
};

export { getYearString };
