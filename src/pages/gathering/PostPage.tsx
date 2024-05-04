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

export function PostPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tag, setTag] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>();
  const [imgFileUrl, setImgFileUrl] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  let gatheringFormData = new FormData();
  const [postData, setPostData] = useState({
    meetingName: '',
    categoryName: '',
    mountainName: '',
    description: '',
    headcount: '',
    date: '',
    tags: [''],
    image: null,
  });

  function handleCategoryInput(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    let category = '';
    category = value;
    // gatheringFormData.append('categoryName',category)
    setPostData(prevData => ({ ...prevData, categoryName: category }));
  }
  function handleMountainInput(e: ChangeEvent<HTMLInputElement>) {
    // gatheringFormData.append('mountainName',e.target.value)

    setPostData(prevData => ({ ...prevData, mountainName: e.target.value }));
  }
  function handleGatheringNameInput(e: ChangeEvent<HTMLInputElement>) {
    // gatheringFormData.append('meetingName',e.target.value);

    setPostData(prevData => ({ ...prevData, meetingName: e.target.value }));
  }
  function handleParticipantsInput(e: ChangeEvent<HTMLInputElement>) {
    // gatheringFormData.append('headcount',e.target.value);

    setPostData(prevData => ({ ...prevData, headcount: e.target.value }))
  }
  function handleDescriptionInput(e: ChangeEvent<HTMLTextAreaElement>) {
    // gatheringFormData.append('description',e.target.value);

    setPostData(prevData => ({ ...prevData, description: e.target.value }))
  }
  useEffect(() => {
    setPostData(prevData => ({ ...prevData, tags: tag }))
  }, [tag]);

  const handleDateChange = (date: Date) => {
    if (date) {
      setSelectedDate(date);
      // gatheringFormData.append('date', formattingDate(date))
      setPostData(prevData => ({ ...prevData, date: formattingDate(date) }))
    }
  };

  function formattingDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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

  function clickMountainSearch() {
    //input을 넣고 검색하면 키워드 검색 / 리스트 출력
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
      console.log(file);
    }
  }

  const { mutate } = useMutation({
    mutationFn: postGathering,
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
      gatheringFormData.append('image', imgFile); // 이미지 파일 추가
    }
    mutate(gatheringFormData);
  }
  return (
    <div className={styles.mainContainer}>
      <TitleContainer title="모임 만들기" />
      <form className={styles.inputContainer}>
        <div className={styles.containerRow}>
          <div className={`${styles.containerCol} ${styles.width60}`}>
            <GatheringCategorySelectBox onChange={handleCategoryInput} />
            <input
              placeholder="산"
              onClick={clickMountainSearch}
              className={styles.inputBox}

              onChange={handleMountainInput}
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
          onChange={handleGatheringNameInput}
        />
        <textarea
          name='description'
          rows={10}
          cols={33}
          className={styles.textarea}
          placeholder="모임 목적을 설명하세요"
          onChange={handleDescriptionInput}
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
                  onChange={handleParticipantsInput}
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
