export const removeDiacritics = (text: string): string => {
    return text.replace(/[\u064B-\u065F\u0670]/g, "");
};