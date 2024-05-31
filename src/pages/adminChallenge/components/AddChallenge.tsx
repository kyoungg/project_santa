import styles from '../AdminChallenge.module.scss';
import { useState, useRef, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addChallenge } from '/src/services/adminChallengesApi';
import { GatheringCategorySelectBox } from '../../gathering/components/GatheringCategorySelectBox';

type Props = {
  setIsItPosting: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddChallenge({ setIsItPosting }: Props) {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [clearStandard, setClearStandard] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchCreateChallenge = async () => {
    if (!imageFile || name === '') return;

    try {
      const res = await addChallenge({
        name,
        categoryName,
        description,
        clearStandard,
        imageFile,
        image: '',
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const { mutate, data } = useMutation({
    mutationFn: fetchCreateChallenge,
    onSuccess: () => {
      if (!imageFile) {
        return alert('챌린지 사진을 등록 해 주세요');
      }
      queryClient.invalidateQueries({ queryKey: ['AdminchallengeList'] });
      alert('챌린지 등록되었습니다!');
      setIsItPosting(false);
    },
    onError: () => {
      alert('다시 시도해주세요');
    },
  });

  const handleRefClick = () => {
    fileRef?.current?.click();
  };
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

  const handleUpload = () => {
    mutate();
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={styles.addMiddle}>
      <div onClick={handleRefClick} className={styles.imgContainer}>
        {previewImage ? (
          <img src={previewImage} alt="preview" />
        ) : (
          <img src="/images/input-img.png" alt="사진 올리기" className={styles.inputImg} />
        )}
      </div>
      <div className={styles.textInputCintainer}>
        <div className={styles.addInputContainer}>
          <label className={styles.label}>제목</label>
          <input className={styles.inputName} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={styles.addInputContainer}>
          <label className={styles.label}>소개</label>
          <input className={styles.inputName} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className={styles.addInputContainer}>
          <label className={styles.label}>달성 목표</label>
          <input
            type="number"
            className={styles.inputName}
            value={clearStandard}
            onChange={(e) => setClearStandard(e.target.valueAsNumber)}
          />
        </div>
        <div className={styles.addInputContainer}>
          <label className={styles.categoryLabel}>카테고리 명</label>
          <GatheringCategorySelectBox
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </div>
        <input
          className=""
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          ref={fileRef}
          onChange={handleChangeImageFile}
          style={{ visibility: 'hidden' }}
        />
      </div>
      <button onClick={handleUpload} className={styles.editSubmitBtn}>
        업로드
      </button>
    </div>
  );
}

export default AddChallenge;
