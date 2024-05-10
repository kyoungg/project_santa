import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/gathering/gatheringMain.module.scss';
import SectionTitle from '/src/components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { getMyGatherings } from '/src/services/gatheringApi';
import Thumbnail from '/src/components/Thumbnail';
import { useEffect } from 'react';

export function MyGatherings() {
    const navigate = useNavigate();
    const { data: myGatherings } = useQuery({
        queryKey: ['myGatherings'],
        queryFn: () => getMyGatherings(0, 3),
        select: (data) => data.data.content,
    })

    useEffect(() => {
        console.log(myGatherings);
    }, [myGatherings])
    const thumbnails = myGatherings && myGatherings.length > 0 ?
        Array.from({ length: 3 }, (_, index) => ({
            id: myGatherings[index]?.meetingId,
            name: myGatherings[index]?.meetingName,
            image: myGatherings[index]?.image
        })) : [];
    return (
        <div className={styles.container}>
            <div onClick={() => navigate('/gathering/participate')} className={styles.width100}>
                <SectionTitle title="나의 모임" subtitle="참여중인 모임을 확인해보세요" isThereToggle={false} />
            </div>
            {thumbnails.length !== 0 && <Thumbnail data={thumbnails} isHotTopic={false} isIndexChip={false} gatheringLink='/gathering/detail?meetingId' />}
            {thumbnails.length === 0 && <div className={styles.noGatheringText}>참여중인 모임이 없습니다.<br />새로운 모임에 참여해보세요!</div>}
        </div>
    )
}