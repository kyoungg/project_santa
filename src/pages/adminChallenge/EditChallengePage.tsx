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
  const [categoryId, setCategoryId] = useState<number>(1);

  if (!id) return <>error</>;

  const fileRef = useRef<HTMLInputElement>(null);

  const [challenge, setChallenge] = useState<TotalChallenge>({
    id: 0,
    name: '',
    description: '',
    image: '',
    clearStandard: 0,
    categoryName: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { data: fetchData, isError } = useQuery({
    queryKey: ['challenge', id],
    queryFn: () => getChallenge(id),
  });

  const queryClient = useQueryClient();

  // /** update api 호출 함수 */
  // const fetchUpdateChallenge = async () => {
  //   const { name, description, clearStandard, image } = challenge;

  //   // 이미지파일과 이름 둘중 하나라도 없으면 return;
  //   if (!imageFile || name === '') return;

  //   try {
  //     const res = await updateChallenge(
  //       {
  //         categoryId: 1,
  //         name,
  //         description,
  //         clearStandard,
  //         imageFile,
  //         image,
  //       },
  //       id,
  //     );

  //     console.log(res);
  //     return res;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  /** update를 위한 useMutaion */
  const { mutate: editMutation, data: updateData } = useMutation({
    mutationFn: updateChallenge,
    onSuccess: () => {
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
      challengeFormData.append('categoryId', categoryId.toString());
      challengeFormData.append('description', challenge.description);
      clearStandard && challengeFormData.append('clearStandard', clearStandard);
      challengeFormData.append('image', challenge.image);
      if (imageFile) {
        challengeFormData.append('imageFile', imageFile);
      }

      console.log(challenge, id);
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
    console.log('----edit challenge---');
    console.log(fetchData);
    if (fetchData) {
      setChallenge(fetchData);
      setClearStandard(fetchData.clearStandard.toString());

    }
  }, [fetchData]);

  useEffect(() => {
    console.log('챌린지출력', challenge);
    console.log(challenge.categoryName);
  }, [challenge])

  useEffect(() => {
    console.log('-----update data---');
    console.log(updateData);
  }, [updateData]);

  if (!fetchData) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const CATEGORY = [
    { id: 1, name: '등산' },
    { id: 2, name: '기타' },
    { id: 3, name: '힐링' },
    { id: 4, name: '식도락' },
    { id: 5, name: '정상깨기' },
    { id: 6, name: '백패킹' },
    { id: 7, name: '출사' },
  ];

  const getCategoryId = (name: string) => {
    for (let i = 0; i < CATEGORY.length; i++) {
      if (CATEGORY[i].name === name) {
        return CATEGORY[i].id;
      }
    }
    return undefined;
  };
  return (
    <div className={styles.container}>
      <TitleContainer title="챌린지 관리" />
      <div className={styles.editMiddle}>
        <div onClick={handleRefClick}>
          {previewImage ? (
            <img src={previewImage} alt="preview" />
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
        <div>

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
          {clearStandard !== null && <input
            type="number"
            className={styles.inputName}
            value={clearStandard}
            onChange={(e) => setClearStandard(e.target.value)}
          />}
          <div>카테고리 명</div>
          {challenge.categoryName !== '' && (<GatheringCategorySelectBox
            defaultValue={challenge?.categoryName}
            onChange={(e) => {
              const categoryId = getCategoryId(e.target.value);
              categoryId && setCategoryId(categoryId);
            }}
          />)}
        </div>
        <button onClick={handleUpdate} className={styles.editSubmitBtn}>
          수정하기
        </button>
      </div>
    </div>
  );
}

export default EditChallengePage;
