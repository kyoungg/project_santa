import styles from '../../../styles/gathering/gatheringMain.module.scss';
import SectionTitle from '/src/components/SectionTitle';
import { GatheringListByCategory, getMyGatherings } from '/src/services/gatheringApi';
import Thumbnail from '/src/components/Thumbnail';
import { useEffect, useState } from 'react';

export function MyGatherings() {

    const [_thumbnails, setThumbnails] = useState<GatheringListByCategory[]>([]);
    useEffect(() => {
        async function fetchData() {
            const res = await getMyGatherings(0, 3);
            console.log(res.data.content);
            setThumbnails(res.data.content);

        }

        fetchData();
    }, [])

    const thumbnails = _thumbnails && _thumbnails.length > 0 ?
        Array.from({ length: 3 }, (_, index) => ({
            id: _thumbnails[index]?.meetingId,
            name: _thumbnails[index]?.meetingName,
            image: _thumbnails[index]?.image
        })) : [];
    return (
        <div className={styles.container}>
            <div className={styles.width100}>
                <SectionTitle title="나의 모임" subtitle="참여중인 모임을 확인해보세요" targetPageUrl='/gathering/participate' />
            </div>
            {thumbnails.length !== 0 && <Thumbnail data={thumbnails} isHotTopic={false} isIndexChip={false} gatheringLink='/gathering/detail?meetingId' />}
            {thumbnails.length === 0 && <div className={styles.noGatheringText}>참여중인 모임이 없습니다.<br />새로운 모임에 참여해보세요!</div>}
        </div>
    )
}