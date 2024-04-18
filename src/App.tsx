import { Route, Routes } from 'react-router-dom';

import './styles/_global.scss';
import Navigation from './components/common/Naigation/Navigation';
import Footer from './components/common/Footer';
import Main from './pages/Main'; //레이아웃 테스트

function App() {
  return (
    <div className="app">
      <Navigation />
      <div id="wrapper">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/porfile" element={<>프로필 페이지 입니다</>} />
          <Route path="/rank" element={<>랭킹 페이지 입니다</>} />
          <Route path="/challenge" element={<>챌린지 페이지 입니다</>} />
          <Route path="/myclub" element={<>내 모임 바로가기 페이지 입니다</>} />
          <Route path="/livechat" element={<>실시간 채팅 페이지 입니다</>} />
          <Route path="/createclub" element={<>모임 만들기 페이지 입니다</>} />
          <Route path="/setting" element={<>설정 페이지 입니다</>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
