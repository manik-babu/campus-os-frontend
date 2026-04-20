export const isTimePassed = (time: string | Date): boolean => {
    const now = new Date();
    const compareTime = new Date(time);
    return compareTime < now;
}