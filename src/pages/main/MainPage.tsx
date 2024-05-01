import { SliderMainImgBanner } from './components/SliderMainImgBanner';
import { Button } from '../../components/common/Button';
import SectionTitle from '../../components/SectionTitle';
import Thumbnail from '../../components/Thumbnail';
import Toggle from './components/Toggle';
import MeetingList from './components/MainMeetingList';
import UserRankList from './components/MainRankList';

import styles from './mainPage.module.scss';

import { getMeetings } from '/src/services/meeting';
import { getRanks } from '/src/services/ranks';

import { useQuery } from '@tanstack/react-query';
import { paths } from '/src/utils/path';

export default function Main() {
  const { data: meetings } = useQuery({ queryKey: ['meetings'], queryFn: getMeetings });
  const { data: ranks } = useQuery({ queryKey: ['ranks'], queryFn: getRanks });

  if (!meetings || !ranks) return <>Loading...</>;
  return (
    <div className={styles.container}>
      <SliderMainImgBanner />
      <div className={styles.flex}>
        <div className={styles.buttonWrapper}>
          <Button onClick={() => {}} variant="yellow">
            내 인증 바로가기
          </Button>
        </div>
        <div className={styles.sectionWrapper}>
          <SectionTitle
            title="챌린지 둘러보기"
            subtitle="업적을 달설할 수 있는 챌린지를 확인해보세요!"
            goToPage={paths.CHALLENGE}
          />
          <Thumbnail img="이미지" title="막걸리 한잔" isHotTopic={true} isIndexChip={true} />
        </div>
        <div>
          <div className={styles.sectionWrapper}>
            <div className={styles.toggleWrapper}>
              <Toggle />
            </div>
            <SectionTitle title="신규 모임" subtitle="현재 진행중인 모임을 확인해보세요." goToPage={paths.GATHERING} />
            <MeetingList meetings={meetings} />
          </div>
        </div>
        <div>
          <SectionTitle title="랭킹🏅" subtitle="이달의 랭킹을 확인해보세요!" goToPage={paths.RANK} />
          <UserRankList ranks={ranks} />
        </div>
      </div>
    </div>
  );
}
