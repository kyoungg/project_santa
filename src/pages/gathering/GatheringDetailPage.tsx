import { TitleContainer } from './components/TitleContainer';
import styles from '../../styles/gathering/gatheringDetailPage.module.scss';
import { FaMountain } from 'react-icons/fa';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Chips } from '../../components/common/Chips';
import { VerticalProfile } from './components/VerticalProfile';
// import { Button, DeleteBtn, EditBtn } from '../../components/common/Button';
import { Button, DeleteBtn, EditBtn } from '../../components/common/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteGathering, getGatheringDetailById } from '/src/services/gatheringApi';
import { getUserInfo } from '/src/services/userApi';
import { useUserInfo } from '/src/utils/useUserInfo';
// import { api } from '/src/services/api';

export function GatheringDetailPage() {
  const [searchParams] = useSearchParams();
  // const [meetingId, setMeetingId] = useState<string>('');
  const [isProfileClicked, setIsProfileClicked] = useState<Boolean[]>([])
  const navigate = useNavigate();
  // useEffect(() => {
  //   const keyword = searchParams.get('meetingid');
  //   if (keyword) {
  //     setMeetingId(keyword);
  //   } else {
  //     setMeetingId('');
  //   }
  // }, [searchParams])
  const meetingId = searchParams.get('meetingid');

  //모임 상세 정보 api 
  const { data: gatheringDetail } = useQuery({
    queryKey: ['gatheringDetail', meetingId],
    queryFn: () => {
      if (meetingId) {
        return getGatheringDetailById(meetingId);
      }
    },
    select: (data) => data?.data,
    enabled: !!meetingId
  })

  if (!meetingId) {
    navigate(-1);
  }


  useEffect(() => {
    console.log(gatheringDetail);
    const isProfileArray = new Array(gatheringDetail?.participants.length).fill(false);
    setIsProfileClicked(isProfileArray);
  }, [gatheringDetail])
  //유저 id정보 
  const { data: userInfo } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: Infinity
  });

  const currentUserName = useUserInfo((data) => data.name);
  useEffect(() => {
    // console.log('userInfo', userInfo);
    //유저 인포 받아와서 작성한 사람에게만 삭제버튼 보이도록 한다.
    console.log(currentUserName);
    //유저 id를 가져와서 비교해야함 
  }, [userInfo])
  //삭제 api 
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteGathering
  });


  function handleEditGatheringDetail(meetingId: number) {
    navigate(`/gathering/detail/edit?meetingid=${meetingId}`);
  }
  function handleDeleteGatheringDetail(meetingId: number) {
    deleteMutation(meetingId);
  }

  function handleReport(index: number) {
    const newState = [...isProfileClicked];
    newState[index] = !isProfileClicked[index];
    setIsProfileClicked(newState);
  }

  return (
    <div className={styles.gatheringDetailContainer}>
      <TitleContainer title={gatheringDetail?.meetingName} />
      <div className={styles.infoContainer}>
        <div className={`${styles.containerRow}  ${styles.deleteEditContainer}`}>
          <EditBtn onClick={() => { if (gatheringDetail) handleEditGatheringDetail(gatheringDetail?.meetingId) }} />
          <DeleteBtn onClick={() => { if (gatheringDetail) handleDeleteGatheringDetail(gatheringDetail?.meetingId) }} />
        </div>
        <div className={styles.containerRow}>
          <img src={gatheringDetail?.image} className={styles.imageContainer}></img>
          <div className={styles.topInfoContainer}>
            <div className={styles.iconTextContainer}>
              <FaMountain />
              <div>{gatheringDetail?.mountainName}</div>
            </div>
            <div className={styles.iconTextContainer}>
              <IoPersonOutline />
              <div>{gatheringDetail?.headcount}명</div>
            </div>
            <div className={styles.iconTextContainer}>
              <IoCalendarClearOutline />
              <div>{gatheringDetail?.date}</div>
            </div>
          </div>
        </div>
        <div className={styles.containerCol}>
          <div className={styles.textarea}>
            <div>{gatheringDetail?.description}</div>
          </div>
          <div className={styles.tagContainer}>
            {gatheringDetail?.tags.map((item: string, index: number) => (
              <div key={`${gatheringDetail?.meetingId}-${index}`}>
                <Chips variant="outline-green3">{item}</Chips>
              </div>
            ))}
          </div>
          <div className={styles.memberContainer}>
            <div className={styles.subtitle1}>참여인원</div>
            <div className={styles.profileListContainer}>
              {gatheringDetail?.participants.map((item, index) => (
                <div className={styles.profileContainer}>
                  <div key={`${item.userId} ${item.userName}`} onClick={() => handleReport(index)}>
                    {isProfileClicked[index] && (<div className={styles.reportBtn}>신고</div>)}
                    <VerticalProfile name={item.userName} imageUrl="/images/defaultProfile.png" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button variant="green3">참가신청하기</Button>
        </div>
      </div>
    </div >
  );
}
