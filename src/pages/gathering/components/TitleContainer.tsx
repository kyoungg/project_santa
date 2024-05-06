import styles from '../../../styles/gathering/gatheringMain.module.scss';

import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
export interface TitleContainerProps {
  title: string | undefined;
}
export function TitleContainer(props: TitleContainerProps) {
  const navigate = useNavigate();
  return (
    <div className={styles.titleContainer}>
      <div className={styles.backBtn} onClick={() => navigate(-1)}>
        <IoChevronBack color="#498428" size={'1.5rem'} />
      </div>
      <div className={styles.title}>{props.title}</div>
    </div>
  );
}
