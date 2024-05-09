/* eslint-disable @typescript-eslint/no-unused-vars */
import { TitleContainer } from './components/TitleContainer';
import styles from '../../styles/gathering/gatheringPostPage.module.scss';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Button } from '../../components/common/Button';
import { IoImageOutline } from 'react-icons/io5';
import { DatePickerComponent } from '../../components/common/DatePickerComponent';
import { ChangeEvent, useEffect, useState } from 'react'; // ChangeEvent 추가
import { IoCloseOutline } from 'react-icons/io5';
import { useMutation } from '@tanstack/react-query';
import { postGathering } from '/src/services/gatheringApi';
import { GatheringCategorySelectBox } from './components/GatheringCategorySelectBox';
import { useNavigate } from 'react-router-dom';
import { formattingDate } from '/src/utils/formattingDate';

export function PostPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tag, setTag] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>();
  const [imgFileUrl, setImgFileUrl] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const navigate = useNavigate();
  let gatheringFormData = new FormData();
  const [postData, setPostData] = useState({
    meetingName: '',
    categoryName: '등산',
    mountainName: '',
    description: '',
    headcount: '',
    date: formattingDate(new Date()),
    tags: [''],
    image: null,
  });
  function handleInput(key: string, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setPostData(prevData => ({ ...prevData, [key]: e.target.value }));
  }

  useEffect(() => {
    setPostData(prevData => ({ ...prevData, tags: tag }))
  }, [tag]);

  const handleDateChange = (date: Date) => {
    if (date) {
      setSelectedDate(date);
      setPostData(prevData => ({ ...prevData, date: formattingDate(date) }))
    }
  };

  function handleInputTag(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    if (inputValue[inputValue.length - 1] === ' ') {
      setTag((prevTag) => {
        const newTag = [...prevTag, inputValue];
        return newTag;
      });
      setTagValue('');
    } else {
      setTagValue(inputValue);
    }
  }


  function deleteTag(index: number) {
    const newArr = [...tag.slice(0, index), ...tag.slice(index + 1)];
    console.log(index, newArr, tag[index]);
    setTag(newArr);
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImgFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(typeof reader.result);
        if (reader.result !== null && typeof reader.result === 'string') {
          setImgFileUrl(reader.result);
        }
      };
    }
  }

  const { mutate } = useMutation({
    mutationFn: postGathering,
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      if (error.message.includes('400')) {
        alert('내용을 입력해주세요.');
      }
      else if (error.message.includes('413')) {
        alert('이미지 용량이 너무 큽니다');
      }
      else if (error.message.includes('409')) {
        alert('해당 날짜에 이미 참여중인 모임이 있습니다.');
      }
      // console.log('error 내용', error.response.status, error)

    }
  });

  function handleCreateBtn() {
    gatheringFormData.append('categoryName', postData.categoryName)
    gatheringFormData.append('mountainName', postData.mountainName)
    gatheringFormData.append('meetingName', postData.meetingName);
    gatheringFormData.append('headcount', postData.headcount);
    gatheringFormData.append('description', postData.description);
    postData.tags.forEach((tagItem, index) => {
      gatheringFormData.append(`tags[${index}]`, tagItem)
    })
    gatheringFormData.append('date', postData.date)

    gatheringFormData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    if (imgFile) {
      gatheringFormData.append('imageFile', imgFile); // 이미지 파일 추가
    }
    mutate(gatheringFormData);
  }
  return (
    <div className={styles.mainContainer}>
      <TitleContainer title="모임 만들기" />
      <form className={styles.inputContainer}>
        <div className={styles.containerRow}>
          <div className={`${styles.containerCol} ${styles.width60}`}>
            <GatheringCategorySelectBox onChange={(e) => handleInput('categoryName', e)} />
            <input
              placeholder="산"
              className={styles.inputBox}

              onChange={(e) => handleInput('mountainName', e)}
            />
          </div>
          <div className={styles.imageContainer}>
            <input
              id="image"
              type="file"
              placeholder="사진"
              className={`${styles.inputBox} ${styles.imageInput}`}
              onChange={handleImageUpload}
            />
            <label htmlFor="image" className={styles.center}>
              {imgFileUrl ? (
                <img src={imgFileUrl} className={styles.image}></img>
              ) : (
                <IoImageOutline size="2rem" color="#7f7f7f" />
              )}
            </label>
          </div>
        </div>
        <input
          name='meetingName'
          type="text"
          placeholder="모임이름"
          className={styles.inputBox}
          onChange={(e) => handleInput('meetingName', e)}
        />
        <textarea
          name='description'
          rows={10}
          cols={33}
          className={styles.textarea}
          placeholder="모임 목적을 설명하세요"
          onChange={(e) => handleInput('description', e)}
        />
        <div>
          <div className={styles.containerCol}>
            <div className={styles.containerRow}>
              <div className={styles.containerRow}>
                <IoPersonOutline />
                <div>정원</div>
              </div>
              <div className={`${styles.inputSettingWidth} ${styles.containerRow} ${styles.grayBack}`}>
                <input
                  name='headcount'
                  type="text"
                  className={styles.inputBox}
                  onChange={(e) => handleInput('headcount', e)}
                />
                <div>명</div>
              </div>
            </div>
            <div className={styles.containerRow}>
              <div className={styles.containerRow}>
                <IoCalendarClearOutline />
                <div>날짜</div>
              </div>
              <div className={` ${styles.containerRow} ${styles.grayBack} ${styles.inputSettingWidth}`}>
                <div className={`${styles.inputBox}`}>
                  <DatePickerComponent
                    selected={selectedDate}
                    onChange={handleDateChange}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
              </div>
            </div>
            <div className={`${styles.outlineContainer} ${styles.containerRow}`}>
              <div>태그</div>
              <div className={`${styles.containerCol} ${styles.inputSettingWidth}`}>
                <input
                  type="text"
                  value={tagValue}
                  onChange={handleInputTag}
                  className={styles.tagInput}
                  placeholder="태그 입력 후 spacebar"
                />
                <div className={styles.tagContainer}>
                  {tag &&
                    tag.map((item, index) => (
                      <div key={index} className={`${styles.containerRow} ${styles.tagItem}`}>
                        <div>{item}</div>
                        <IoCloseOutline className={styles.closeBtn} onClick={() => deleteTag(index)} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Button type='submit' variant="green3" onClick={handleCreateBtn}>
        모임 만들기{' '}
      </Button>
    </div>
  );
}
