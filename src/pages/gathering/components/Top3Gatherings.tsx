// import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/gathering/gatheringMain.module.scss';
import SectionTitle from '/src/components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import { getPopularGatherings } from '/src/services/gatheringApi';
import Thumbnail from '/src/components/Thumbnail';
import { useEffect, useState } from 'react';
import { ThumbnailChallenge } from '/src/services/challengeApi';
export function Top3Gatherings() {
    // const navigate = useNavigate();
    const { data: top3Gatherings, isFetched, isError } = useQuery({
        queryKey: ['top3Gatherings'],
        queryFn: () => getPopularGatherings(0, 3),
        select: (data) => data.data.content,
    })
    const [thumbnails, setThumbnails] = useState<ThumbnailChallenge[]>([]);
    useEffect(() => {
        if (isFetched && !isError && top3Gatherings) {
            const thumbnailsArray = Array.from({ length: 3 }, (_, index) => ({
                id: top3Gatherings[index]?.meetingId,
                name: top3Gatherings[index]?.meetingName,
                image: top3Gatherings[index]?.image
            }));
            setThumbnails(thumbnailsArray);
        }
    }, [top3Gatherings])
    return (
        <div className={styles.container}>
            <div className={styles.width100}>
                <SectionTitle title="인기 모임" subtitle="산타의 인기 모임을 확인해보세요" />
            </div>
            <Thumbnail data={thumbnails} isHotTopic={false} isIndexChip={false} gatheringLink='/gathering/detail?meetingId' />
        </div>
    )
}