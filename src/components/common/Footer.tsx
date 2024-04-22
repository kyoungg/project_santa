import githubLogo from '/images/github_logo.png';
import logo from '/images/logo.svg';
import styles from '../../styles/components/common/footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.aboutBox}>
        <img className={styles.logo} src={logo} />
        <div className={styles.about}>
          <p>문의 사항이 있으시다면 아래 링크에 이슈를 남겨 주세요.</p>
          <div className={styles.gitContainer}>
            <img src={githubLogo} />
            <p>https://github.com/elice</p>
          </div>
          <p className={styles.member}>기여한 사람</p>
          <p>옥찬혁 김경혜 나정균 민지원 윤혜원 진채영</p>
        </div>
      </div>
      <div className={styles.qnaContainer}>
        <p>자주 묻는 질문</p>
        <div className={styles.qnaLine}></div>
        <p>[Q&A] 챌린지를 취소하고 싶어요</p>
        <p>[Q&A] 내 주변 산을 즐겨찾기하고 싶어요</p>
      </div>
    </footer>
  );
}
