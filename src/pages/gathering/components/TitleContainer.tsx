import styles from '../../../styles/gathering/gatheringMain.module.scss';

import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
export interface TitleContainerProps {
  title: string | undefined;
}
export function TitleContainer(props: TitleContainerProps) {
  return (
    <div className={styles.titleContainer}>
      <Link className={styles.backBtn} to="/gathering">
        <IoChevronBack color="#498428" size={'1.5rem'} />
      </Link>
      <div>{props.title}</div>
    </div>
  );
}
