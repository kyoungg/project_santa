import styles from '../mainPage.module.scss';
import { _imageSrcArray, _path } from '/src/utils/ImgPath';
//김경혜
import { SlArrowRight } from 'react-icons/sl';
import { SlArrowLeft } from 'react-icons/sl';

import { useState, useRef } from 'react';

const SliderBannerImg = () => {
  const slideRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [_imageSrc, _setImageSrc] = useState('');
  const [_bannerImgList, _setBannerImgList] = useState('');
  const [_tab, _setTab] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (isLeft: boolean) => {
    if (!slideRef.current) return;

    // 이미지가 마지막장인데 오른쪽으로 넘길때
    if (currentIndex === _imageSrcArray.length - 1 && !isLeft) {
      slideRef.current.style.transform = `translateX(${0})`;
      setCurrentIndex(0);
      return;
    }

    // 이미지가 첫번째 장인데 왼쪽으로 넘길때
    if (currentIndex === 0 && isLeft) {
      const translateX = (_imageSrcArray.length - 1) * 100;
      slideRef.current.style.transform = `translateX(${-translateX}%)`;
      setCurrentIndex(_imageSrcArray.length - 1);
      return;
    }

    // 그냥 넘길때
    else {
      const 방향 = !isLeft ? 1 : -1;
      const translateX = (currentIndex + 방향) * -100;
      slideRef.current.style.transform = `translateX(${translateX}%)`;
      setCurrentIndex((prev) => (isLeft ? prev - 1 : prev + 1));
    }
  };

  return (
    <div className={styles.sliderImgContainer}>
      <div className={styles.bannerContainer} ref={slideRef}>
        <div className={styles.sliderBox} ref={boxRef}>
          {_imageSrcArray.map((src, _index) => (
            <img src={`${_path}/${src}`} className={styles.bannerImage} key={src} />
          ))}
        </div>
      </div>
      <div className={styles.sliderButtonLeft} onClick={() => handleClick(true)}>
        {/* 김경혜 <img src="/images/btn-left.png" alt="<" className={styles.btnImg} /> */}
        <SlArrowLeft className={styles.btnImg} />
      </div>
      <div className={styles.sliderButtonRight} onClick={() => handleClick(false)}>
        {/* 김경혜 <img src="/images/btn-right.png" alt=">" className={styles.btnImg} /> */}
        <SlArrowRight className={styles.btnImg} />
      </div>
    </div>
  );
};

export default SliderBannerImg;
