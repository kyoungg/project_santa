/**
 * preventDefault() 묶어둔 함수
 * [[] 사용법 ]]
 * <div onClick={stopEvent('all')}/>
 * <div onClick={stopEvent('propagation')}/>
 */
const stopEvent = (type: 'all' | 'propagation' = 'all') => {
  (e: React.MouseEvent) => {
    if (type === 'all') {
      e.stopPropagation();
      e.preventDefault();
    }
    if (type === 'propagation') {
      e.stopPropagation();
    }
  };
};

export default stopEvent;
