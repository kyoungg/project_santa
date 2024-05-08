import { Button } from '../../main/components/Button';
import styles from '../AdminChallenge.module.scss';
import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addChallenge } from '/src/services/adminChallengesApi';
function AddChallenge() {
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [categoryId, _setCategoryId] = useState(1);
  const [description, setDescription] = useState('');
  const [clearStandard, _setClearStandard] = useState(1);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchCreateChallenge = async () => {
    if (!imageFile || name === '') return;

    try {
      const res = await addChallenge({
        name,
        categoryId,
        description,
        clearStandard,
        imageFile,
        image: '',
      });

      console.log(res);
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const { mutate, data } = useMutation({
    mutationFn: fetchCreateChallenge,
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
    <div className={styles.container}>
      <div onClick={handleRefClick}>
        {previewImage ? (
          <img src={previewImage} alt="preview" />
        ) : (
          <img src="/images/input-img.png" alt="사진 올리기" className={styles.inputImg} />
        )}
      </div>
      <input
        className={styles.inputTextBox}
        placeholder="제목을 입력해주세요."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={styles.inputTextBox}
        placeholder="내용을 입력해주세요."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className=""
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        ref={fileRef}
        onChange={handleChangeImageFile}
        style={{ visibility: 'hidden' }}
      />
      <Button onClick={handleUpload}>업로드</Button>
    </div>
  );
}

export default AddChallenge;
