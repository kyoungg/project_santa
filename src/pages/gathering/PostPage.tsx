/* eslint-disable @typescript-eslint/no-unused-vars */
import { TitleContainer } from './components/TitleContainer';
import styles from '../../styles/gathering/gatheringPostPage.module.scss';
import { IoPersonOutline } from 'react-icons/io5';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { Button } from '../../components/common/Button';
import { IoImageOutline } from 'react-icons/io5';
import { DatePickerComponent } from '../../components/common/DatePickerComponent';
import { ChangeEvent, useEffect, useRef, useState } from 'react'; // ChangeEvent 추가
import { IoCloseOutline } from 'react-icons/io5';

export function PostPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formatDate, setFormatDate] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>();
  const [imgFile, setImgFile] = useState<string | null>(null);

  const handleDateChange = (date: Date) => {
    if (date) {
      setSelectedDate(date);
      setFormatDate(formattingDate(date));
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
      console.log(inputValue);
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

  useEffect(() => {
    console.log(tag);
  }, [tag]);

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log(typeof reader.result);
        if (reader.result !== null && typeof reader.result === 'string') {
          setImgFile(reader.result);
        }
      };

      console.log(file);
    }
  }
  return (
    <div className={styles.mainContainer}>
      <TitleContainer title="모임 만들기" />
      <div className={styles.inputContainer}>
        <div className={styles.containerRow}>
          <div className={`${styles.containerCol} ${styles.width60}`}>
            <input placeholder="카테고리" className={styles.inputBox} />
            <input placeholder="산" onClick={clickMountainSearch} className={styles.inputBox} />
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
              {imgFile ? (
                <img src={imgFile} className={styles.image}></img>
              ) : (
                <IoImageOutline size="2rem" color="#7f7f7f" />
              )}
            </label>
          </div>
        </div>
        <input type="text" placeholder="모임이름" className={styles.inputBox} />
        <textarea rows={10} cols={33} className={styles.textarea} placeholder="모임 목적을 설명하세요" />
        <div>
          <div className={styles.containerCol}>
            <div className={styles.containerRow}>
              <div className={styles.containerRow}>
                <IoPersonOutline />
                <div>정원</div>
              </div>
              <div className={`${styles.inputSettingWidth} ${styles.containerRow} ${styles.grayBack}`}>
                <input type="text" className={styles.inputBox} />
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
      </div>
      <Button variant="green3">모임 만들기 </Button>
    </div>
  );
}
