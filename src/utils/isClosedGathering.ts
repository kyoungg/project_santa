export function isClosedGathering(date: string) {
  const today = new Date();
  const gatheringDate = new Date(date);
  console.log('오늘날짜', today, '비교날짜', gatheringDate);

  if (gatheringDate && gatheringDate < today) {
    console.log(date, 'true입니다.');
    return true;
  } else return false;
}
