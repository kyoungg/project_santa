import styles from '../../../styles/admin/listComponent.module.scss'
import { DeleteBtn, EditBtn } from '/src/components/common/Button';
import { PiSiren } from "react-icons/pi";
import useIntersectionObserver from '/src/hooks/useIntersectionObserver';

interface ListComponentProps {
    report?: number;
    title: string;
    subtitle?: string;
    content?: string;
    onClickDelete?: () => void,
    isLast?: boolean;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    onClickEdit?: () => void,
}
export function ListComponent({ title, subtitle, content, report, isLast,
    setPage, onClickDelete, onClickEdit }: ListComponentProps) {
    const { targetRef } = useIntersectionObserver<HTMLDivElement>(() => {
        if (isLast && setPage) {
            setPage((prev) => prev + 1);
        }
    });
    return (
        <div className={styles.listContainer}
            ref={(_ref) => {
                if (isLast) {
                    console.log('ref 할당');
                    targetRef.current = _ref;
                } else {
                    _ref = null;
                }
            }}
        >
            <div className={styles.colContainer}>
                {report !== undefined && (
                    <div className={styles.rowContainer}>
                        <PiSiren />
                        <div>{report}</div>
                    </div>
                )}
                <div className={styles.title}>{title}</div>
                <div className={styles.subtitle}>{subtitle}</div>
                <div className={styles.body}>{content}</div>
            </div>
            <div className={styles.rowContainer}>
                {onClickEdit && <EditBtn onClick={onClickEdit} />}
                {onClickDelete && <DeleteBtn onClick={onClickDelete} />}
            </div>
        </div>
    )
}