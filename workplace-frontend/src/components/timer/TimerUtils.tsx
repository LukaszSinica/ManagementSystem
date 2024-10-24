export const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const format = (unit: number) => String(unit).padStart(2, '0');
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};

