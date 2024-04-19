import SectionTitle from '../../components/SectionTitle';

export default function Rank() {
  return (
    <div>
      <SectionTitle
        title="랭킹🏅"
        subtitle="이달의 랭킹을 확인해보세요. 랭킹은 매달 1일 초기화됩니다."
        moreButtonId=""
        isThereMoreButton={false}
      />
      랭킹 페이지입니다.
    </div>
  );
}
