export const validateName = (value: string | undefined | null): boolean => {
    if (!value || typeof value !== "string") {
        return false;
    }

    const trimmed = value.trim();
    if (trimmed.length < 2) {
        return false;
    }

    const nameRegex = /^[A-Za-zА-Яа-я\s\-']+$/;
    return nameRegex.test(trimmed);
};

export const validateDate = (date: string): boolean => {
    if (!date || date.length !== 10) return false;

    const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    if (!regex.test(date)) return false;

    const [day, month, year] = date.split(".").map(Number);
    const dateObj = new Date(year, month - 1, day);

    return (
        dateObj.getDate() === day &&
        dateObj.getMonth() === month - 1 &&
        dateObj.getFullYear() === year
    );
};
