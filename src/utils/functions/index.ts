export const capitalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .split(/(\s+|-)/)
        .map((word, index, array) => {
            if (index === 0 || array[index - 1] === "-") {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word;
        })
        .join("")
        .replace(/(\s+)/g, " ");
};
