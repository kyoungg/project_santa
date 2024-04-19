import '../pages/main/main.style.scss';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  moreButtonId?: string;
  isThereMoreButton: boolean;
  isThereToggle?: boolean;
}

export default function SectionTitle({
  title = '챌린지 둘러보기',
  subtitle = '업적을 달설할 수 있는 챌린지를 확인해보세요!',
  moreButtonId = '1',
  isThereMoreButton = true,
}: SectionTitleProps) {
  return (
    <div className="section-title-wrapper">
      <p className="title">{title}</p>
      <div className="subtitle-wrapper">
        <p className="subtitle">{subtitle}</p>
        {isThereMoreButton ? (
          <p className="absolute-more-button" id={`${moreButtonId}`}>
            더보기 &gt;
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
