import { IoChevronForwardOutline } from "react-icons/io5";
import styles from '../../styles/admin/adminMain.module.scss';
import { useNavigate } from 'react-router-dom';


export function AdminMainPage() {
    const navigate = useNavigate();
    return (
        <div className={styles.adminPageContainer}>
            <div className={styles.title}>관리자 메뉴</div>
            <div className={styles.rowContainer} onClick={() => navigate('/admin/user')}>
                <div>회원 관리</div>
                <IoChevronForwardOutline />
            </div>
            <div className={styles.rowContainer} onClick={() => navigate('/admin/challenge')}>
                <div>챌린지 관리</div>
                <IoChevronForwardOutline />
            </div>
            <div className={styles.rowContainer} onClick={() => navigate('/admin/report')}>
                <div>신고 관리</div>
                <IoChevronForwardOutline />
            </div>
            <div className={styles.rowContainer} onClick={() => navigate('/admin/category')}>
                <div>카테고리 관리</div>
                <IoChevronForwardOutline />
            </div>

        </div>
    )
}