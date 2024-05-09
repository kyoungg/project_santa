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
import { closeGathering, deleteGathering, getGatheringDetailById, joinGathering, userReport } from '/src/services/gatheringApi';
import { useUserInfo } from '/src/utils/useUserInfo';
import { compareUserAndLeader } from '/src/utils/compareUserAndLeader';
import { isClosedGathering } from '/src/utils/isClosedGathering';
// import { api } from '/src/services/api';

const adminId = 24;
export function GatheringDetailPage() {
  const [searchParams] = useSearchParams();
  const [isProfileClicked, setIsProfileClicked] = useState<Boolean[]>([])
  const navigate = useNavigate();
  const [isSameUser, setIsSameUser] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  //쿼리 파라미터로 meeting id를 가져온다 
  const meetingId = searchParams.get('meetingid');

  //모임 상세 정보 api 
  const { data: gatheringDetail, isLoading } = useQuery({
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

  //프로필 클릭 여부 상태 
  useEffect(() => {
    const isProfileArray = new Array(gatheringDetail?.participants.length).fill(false);
    setIsProfileClicked(isProfileArray);
  }, [gatheringDetail])

  //유저 id정보 
  const currentUserId = useUserInfo((data) => data.id);
  useEffect(() => {
    //작성자의 id 와 모임장의 id 비교하기 위한 상태
    if (!isLoading && gatheringDetail) {
      setIsSameUser(compareUserAndLeader(currentUserId, adminId, gatheringDetail.leaderId))
    }
    //오늘 날짜와 비교해서 종료된 모임 구분 
    if (gatheringDetail) {
      setIsClosed(isClosedGathering(gatheringDetail.date));
    }
  }, [isLoading, gatheringDetail])
  //삭제 api 
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteGathering,
    onSuccess: () => {
      navigate(-1);
    },
  });


  //모임 닫기 api 
  const { mutate: closeGatheringMutation } = useMutation({
    mutationFn: closeGathering,
    onSuccess: () => {
      alert('모임 종료가 완료되었습니다.');
      navigate(-1);
    }
  })

  //모임 참여 api 
  const { mutate: joinGatheringMutation } = useMutation({
    mutationFn: joinGathering,
    onSuccess: () => {
      alert('모임 참여가 완료되었습니다.')
      navigate(-1);
    }
  })
  //신고 api
  const { mutate: reportMutation } = useMutation({
    mutationFn: userReport,
    onSuccess: () => {
      alert('신고가 완료 되었습니다.');
    }
  })

  //수정 버튼 클릭시 페이지 이동 
  function handleEditGatheringDetail(meetingId: number) {
    navigate(`/gathering/detail/edit?meetingid=${meetingId}`);
  }
  //삭제 
  function handleDeleteGatheringDetail(meetingId: number) {
    deleteMutation(meetingId);
  }
  //프로필 누르면 신고 버튼 생성 
  function handleReport(index: number) {
    const newState = [...isProfileClicked];
    newState[index] = !isProfileClicked[index];
    setIsProfileClicked(newState);
  }
  function handleClickReportBtn(id: number) {
    const reason = prompt('신고 이유를 입력하세요 :', '') || '';
    const data = {
      reason: reason,
      reportedParticipantId: id,
    }
    reportMutation(data);

  }
  //모임 종료하기 버튼을 클릭
  function handleCloseGathering() {
    if (meetingId) {
      closeGatheringMutation(meetingId);
    }
  }

  //모임 신청하기 버튼 클릭 
  function handleJoinGathering() {
    if (meetingId) {
      joinGatheringMutation(meetingId);
    }
  }

  return (
    <div className={styles.gatheringDetailContainer}>
      <TitleContainer title={gatheringDetail?.meetingName} />
      <div className={styles.infoContainer}>
        <div className={`${styles.containerRow}  ${styles.deleteEditContainer}`}>
          {isSameUser && (
            <><EditBtn onClick={() => { if (gatheringDetail) handleEditGatheringDetail(gatheringDetail?.meetingId); }} /><DeleteBtn onClick={() => { if (gatheringDetail) handleDeleteGatheringDetail(gatheringDetail?.meetingId); }} /></>
          )}
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
              {gatheringDetail?.participants.map((participant, index) => (
                <div className={styles.profileContainer}>
                  <div key={`${participant.userId} ${participant.userName}`} onClick={() => handleReport(index)}>
                    {isProfileClicked[index] && (<div className={styles.reportBtn} onClick={() => handleClickReportBtn(participant.userId)}>신고</div>)}
                    <VerticalProfile name={participant.userName} imageUrl="/images/defaultProfile.png" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isClosed ? (
            <Button variant="gray">이미 종료된 모임입니다</Button>
          ) : (
            isSameUser ? (
              <Button variant="green3" onClick={handleCloseGathering}>모임 종료하기</Button>
            ) : (
              <Button variant="green3" onClick={handleJoinGathering}>참가신청하기</Button>
            )
          )}
        </div>
      </div>
    </div >
  );
}
