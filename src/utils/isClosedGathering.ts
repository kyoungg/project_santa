export function isClosedGathering(date: string) {
    const today = new Date();
    const gatheringDate = new Date(date);
    if (gatheringDate && gatheringDate < today) {
        return true;
    } else return false;
}