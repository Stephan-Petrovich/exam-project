export const validateName = (value: string): boolean => {
    const nameRegex = /^[A-Za-zА-Яа-я\s\-']+$/;

    return nameRegex.test(value) && value.trim().length >= 2;
};

export const validateDate = (value: string): boolean => {
    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

    if (!dateRegex.test(value)) return false;

    const [day, month, year] = value.split(".").map(Number);

    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;

    const date = new Date(year, month - 1, day);
    return (
        date.getDate() === day &&
        date.getMonth() === month - 1 &&
        date.getFullYear() === year
    );
};
