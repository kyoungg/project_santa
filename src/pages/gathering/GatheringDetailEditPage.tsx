import { useSearchParams } from 'react-router-dom';
import { TitleContainer } from './components/TitleContainer';
import { ChangeEvent, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { useMutation, useQuery } from '@tanstack/react-query';
import styles from '../../styles/gathering/gatheringPostPage.module.scss';
import { getGatheringDetailById } from '/src/services/gatheringApi';
// import { editGathering, getGatheringDetailById } from '/src/services/gatheringApi';
import { GatheringCategorySelectBox } from './components/GatheringCategorySelectBox';
import { IoCalendarClearOutline, IoCloseOutline, IoImageOutline, IoPersonOutline } from 'react-icons/io5';
import { DatePickerComponent } from '/src/components/common/DatePickerComponent';
import { GatheringDetailType } from '/src/services/gatheringApi';
import { Button } from '/src/components/common/Button';

export function GatheringDetailEditPage() {
    const [searchParams] = useSearchParams();
    const [meetingId, setMeetingId] = useState('');

    const [gatheringData, setGatheringData] = useState<GatheringDetailType>({
        meetingId: 0,
        leaderId: 0,
        userEmail: '',
        meetingName: '',
        categoryName: '',
        mountainName: '',
        description: '',
        headcount: 0,
        date: '',
        tags: [''],
        image: '',
        imageFile: '',
        participants: [
            {
                userId: 0,
                userName: '',
                userImage: '',
            }
        ]
    });
    const [tag, setTag] = useState<string[]>([]);
    const [tagValue, setTagValue] = useState<string>();
    const [imgFileUrl, setImgFileUrl] = useState<string>('');
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const keyword = searchParams.get('meetingid');
        if (keyword) {
            setMeetingId(keyword);
        } else {
            setMeetingId('');
        }
    }, [searchParams])

    const { data: gatheringDetail } = useQuery({
        queryKey: ['gatheringDetail', meetingId],
        queryFn: () => {
            return getGatheringDetailById(meetingId);
        },
        select: (data) => data?.data,
    })

    useEffect(() => {
        if (gatheringDetail) {
            console.log('데이터 가져오기 성공', gatheringDetail)
            setGatheringData(gatheringDetail);
            setTag([...gatheringData.tags]);
            setImgFileUrl(gatheringData.image);

            //time value 때문에 오류가 남 
            // setSelectedDate(new Date(gatheringData.date))
        }
    }, [gatheringDetail])

    useEffect(() => {
        console.log('tag', tag)

    }, [tag])
    function handleDataEdit(key: string, e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        setGatheringData(prevData => ({ ...prevData, [key]: e.target.value }));
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

    function deleteTag(index: number) {
        const newArr = [...gatheringData.tags.slice(0, index), ...gatheringData.tags.slice(index + 1)];
        console.log(index, newArr, gatheringData.tags[index]);
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
    function formattingDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const handleDateChange = (date: Date) => {
        if (date) {
            setSelectedDate(date);
            setGatheringData(prevData => ({ ...prevData, date: formattingDate(date) }))
        }
    };

    // const { mutate } = useMutation({
    //     mutationFn: editGathering,
    // });
    //타입 오류가 나는데 어떻게 해야할지 모르겠다

    function handleCreateBtn() {
        //아직 구현중
        const gatheringFormData = new FormData();
        gatheringFormData.append('categoryName', gatheringData.categoryName)
        gatheringFormData.append('mountainName', gatheringData.mountainName)
        gatheringFormData.append('meetingName', gatheringData.meetingName);
        gatheringFormData.append('headcount', gatheringData.headcount.toString());
        gatheringFormData.append('description', gatheringData.description);
        gatheringData.tags.forEach((tagItem, index) => {
            gatheringFormData.append(`tags[${index}]`, tagItem)
        })
        gatheringFormData.append('date', gatheringData.date)

        gatheringFormData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        if (imgFile) {
            gatheringFormData.append('imageFile', imgFile); // 이미지 파일 추가
        }
        // mutate(Number(meetingId), gatheringFormData);
    }

    return (
        <div className={styles.mainContainer}>
            <TitleContainer title="모임 만들기" />
            <form className={styles.inputContainer}>
                <div className={styles.containerRow}>
                    <div className={`${styles.containerCol} ${styles.width60}`}>
                        {gatheringData.categoryName !== '' && (
                            <GatheringCategorySelectBox
                                onChange={(e) => handleDataEdit('categoryName', e)}
                                defaultValue={gatheringData.categoryName}
                            />
                        )}                        <input
                            value={gatheringData.mountainName}
                            placeholder="산"
                            className={styles.inputBox}
                            onChange={(e) => handleDataEdit('mountainName', e)}
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
                            {imgFileUrl !== '' ? (
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
                    value={gatheringData.meetingName}
                    className={styles.inputBox}
                    onChange={(e) => handleDataEdit('meetingName', e)}
                />
                <textarea
                    name='description'
                    value={gatheringData.description}
                    rows={10}
                    cols={33}
                    className={styles.textarea}
                    placeholder="모임 목적을 설명하세요"
                    onChange={(e) => handleDataEdit('description', e)}
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
                                    value={gatheringData.headcount}
                                    name='headcount'
                                    type="text"
                                    className={styles.inputBox}
                                    onChange={(e) => handleDataEdit('headcount', e)}
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
                                    {tag.length !== 0 &&
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
    )
}