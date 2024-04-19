import { Button } from '../../components/common/Button';
import '../../styles/join/joinStyle.scss';
function JoinPage() {
  return (
    <div className="join-container">
      <form>
        <div className="input-container email">
          <div className="label">이메일</div>
          <div className="email-input-container">
            <input type="email" className="email-input"></input>
            <div className="check-btn">중복확인</div>
          </div>
        </div>
        <div className="input-container password">
          <div className="label">이메일</div>
          <input type="text"></input>
        </div>
        <div className="input-container password-check">
          <div className="label">비밀번호 확인</div>
          <input type="text"></input>
        </div>
        <div className="input-container nickname">
          <div className="label">닉네임</div>
          <input type="text"></input>
        </div>
        <div className="input-container name">
          <div className="label">이름</div>
          <input type="text"></input>
        </div>
        <div className="input-container phone">
          <div className="label">휴대폰</div>
          <input type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" placeholder='"-" 를 제외하고 입력해주세요'></input>
        </div>
      </form>
      <Button variant="green3">회원가입 완료</Button>
    </div>
  );
}

export default JoinPage;
