import styles from '../../../styles/gathering/gatheringList.module.scss';
import useIntersectionObserver from '/src/hooks/useIntersectionObserver';
type Props = {
  title: string;
  content: string;
  tag: string;
  imageUrl: string;
  mountain: string;
  capacity: number;
  attendance: number;
  date: string;
  isLast?: boolean;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  onClick: () => void;
};
export function GatheringList({
  title,
  content,
  tag,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // imageUrl,
  mountain,
  capacity,
  attendance,
  date,
  isLast,
  setPage,
  onClick,
}: Props) {
  const { targetRef } = useIntersectionObserver<HTMLDivElement>(() => {
    if (isLast && setPage) {
      setPage((prev) => prev + 1);
    }
  });

  return (
    <div
      className={styles.gatheringListContainer}
      ref={(_ref) => {
        if (isLast) {
          console.log('ref 할당');
          targetRef.current = _ref;
        } else {
          _ref = null;
        }
      }}
      onClick={onClick}
    >
      <div className={styles.image}>이미지</div>

      <div className={styles.textContainer}>
        <div className={styles.subtitle1}>{title}</div>
        <div className={`${styles.body2} ${styles.hidden}`}>{content}</div>
        <div className={`${styles.infoContainer} ${styles.body2}`}>
          <div className={styles.tag}>{tag}</div>
          <div>{mountain}</div>
          <div>
            {attendance}/{capacity}(명)
          </div>
          <div>{date}</div>
        </div>
      </div>
    </div>
  );
}

//title, content, tag, image, mountain, member, date
