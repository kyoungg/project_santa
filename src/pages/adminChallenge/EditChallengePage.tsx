// component
import { TitleContainer } from '../gathering/components/TitleContainer';

// styles
import styles from './AdminChallenge.module.scss';

// hooks
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// api
import { getChallenge, updateChallenge } from '/src/services/adminChallengesApi';
import { TotalChallenge } from '/src/services/challengeApi';
import { paths } from '/src/utils/path';
import { GatheringCategorySelectBox } from '../gathering/components/GatheringCategorySelectBox';

function EditChallengePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clearStandard, setClearStandard] = useState<string | null>();
  const [categoryName, setCategoryName] = useState<string>('');

  if (!id) return <>error</>;

  const fileRef = useRef<HTMLInputElement>(null);

  const [challenge, setChallenge] = useState<TotalChallenge>({
    id: 0,
    name: '',
    description: '',
    image: '',
    clearStandard: 0,
    categoryName: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { data: fetchData, isError } = useQuery({
    queryKey: ['challenge', id],
    queryFn: () => getChallenge(id),
  });

  const queryClient = useQueryClient();

  /** update를 위한 useMutaion */
  const { mutate: editMutation } = useMutation({
    mutationFn: updateChallenge,
    // todo modal이나 toast로 변경해보깅
    onSuccess: () => {
      alert('수정이 완료되었습니다.');
      navigate(paths.ADMIN_CHALLENGE);
      return queryClient.invalidateQueries({ queryKey: ['AdminchallengeList'] });
    },
    onError: (e) => {
      console.error(e);
    },
  });

  /** mutation 호출 함수 */
  const handleUpdate = () => {
    const challengeFormData = new FormData();
    if (challenge) {
      challengeFormData.append('name', challenge.name);
      challengeFormData.append('categoryName', categoryName);
      challengeFormData.append('description', challenge.description);
      clearStandard && challengeFormData.append('clearStandard', clearStandard);
      challengeFormData.append('image', challenge.image);
      if (imageFile) {
        challengeFormData.append('imageFile', imageFile);
      }

      editMutation({ id: id, data: challengeFormData });
    }
  };

  /** 챌린지 이름, 설명 변경 함수 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChallenge({
      ...challenge,
      [name]: value,
    });
  };

  /** input type file 클릭 함수 */
  const handleRefClick = () => {
    fileRef?.current?.click();
  };

  /** 이미지 파일 업로드 함수 */
  const handleChangeImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (fetchData) {
      setChallenge(fetchData);
      setClearStandard(fetchData.clearStandard.toString());
      setCategoryName(fetchData.categoryName);
    }
  }, [fetchData]);

  if (!fetchData) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className={styles.container}>
      <TitleContainer title="챌린지 관리" />
      <div className={styles.editMiddle}>
        <div onClick={handleRefClick}>
          {previewImage ? (
            <img src={previewImage} alt="preview" className={styles.inputImg} />
          ) : (
            <img src={challenge.image} alt="사진 수정하기" className={styles.inputImg} />
          )}
        </div>
        <input
          className=""
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          ref={fileRef}
          onChange={handleChangeImageFile}
          style={{ visibility: 'hidden' }}
        />
        <div className={styles.contentContainer}>
          <div>제목</div>
          <input type="text" value={challenge.name} name="name" onChange={handleChange} className={styles.inputName} />
          <div>소개</div>
          <input
            type="text"
            value={challenge.description}
            name="description"
            onChange={handleChange}
            className={styles.inputDescription}
          />
          <div>달성목표</div>
          {clearStandard !== null && (
            <input
              type="number"
              className={styles.inputName}
              value={clearStandard}
              onChange={(e) => setClearStandard(e.target.value)}
            />
          )}

          <div>카테고리 명</div>
          {challenge.categoryName !== '' && (
            <GatheringCategorySelectBox
              defaultValue={challenge?.categoryName}
              onChange={(e) => {
                // const categoryId = getCategoryId(e.target.value);
                // react-hook-form
                categoryName && setCategoryName(e.target.value);
              }}
            />
          )}
        </div>
        <button onClick={handleUpdate} className={styles.editSubmitBtn}>
          수정하기
        </button>
      </div>
    </div>
  );
}

export default EditChallengePage;
