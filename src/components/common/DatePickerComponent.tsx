import DatePicker from 'react-datepicker';

import '../../styles/components/common/datePicker/_datePicker.scss';
type DatePickerProps = {
  selected: Date;
  onChange: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
};
export function DatePickerComponent(props: DatePickerProps) {
  return (
    <DatePicker
      className="input-custom"
      selected={props.selected}
      onChange={(date) => {
        if (date) {
          props.setSelectedDate(date as Date); // 선택한 날짜로 상태 업데이트
          props.onChange(date); // 선택한 날짜를 부모 컴포넌트로 전달
        }
      }}
      dateFormat="yyyy년 MM월 dd일"
    />
  );
}
