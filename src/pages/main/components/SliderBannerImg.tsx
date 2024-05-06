import styles from '../mainPage.module.scss';
// import { imageSrcArray, path } from '/src/utils/imgPath';

import { useState } from 'react';

const _imageSrcArray = ['banner-img1.png', 'banner-img2.png', 'banner-img3.png'];
const _path = `banner-img`;

const SliderBannerImg = () => {
  const [_imageSrc, _setImageSrc] = useState('');
  const [_bannerImgList, _setBannerImgList] = useState('');
  const [_tab, _setTab] = useState(0);
  const [_currentIndex, _setCurrentIndex] = useState(0);

  // const _handleTargetLink = (src: string, index: number) => {
  //   setImageSrc(`${_path}/${src}`);
  //   setTab(index);
  // };

  // const _handleSliderImg = ({}) => {};

  return (
    <div className={styles.sliderImgContainer}>
      <div className={styles.bannerContainer}>
        <div className={styles.sliderBox}>
          {_imageSrcArray.map((src, _index) => (
            <div className={styles.slideItem}>
              <img src={`${_path}/${src}`} />
            </div>
          ))}
          <div className={styles.sliderButtonWrapper}>
            <div className={styles.sliderButton}></div>
            <div className={styles.sliderButton}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderBannerImg;
