import { Outlet, useLocation } from 'react-router-dom';

import Navigation from '../components/common/Naigation/Navigation';
import TabBar from '../components/common/Naigation/TabBar';
import Footer from '../components/common/Footer';

const INCLUDE_TAB_BAR_PATH = ['/rank', '/gathering', '/gathering/search'];
const INCLUDE_FOOTER_PATH = ['/', '/rank'];

//나중에 nav 컴포넌트 안에서 제어하기
const INCLUDE_BACK_BTN_PATH = [
  '/livechat',
  '/join',
  '/trophy',
  '/user/find-password',
  '/user/find-account',
  '/user/reset-password',
  '/user/category',
  '/join',
  '/mountain/record',
];

export default function Layout() {
  const path = useLocation().pathname;
  return (
    <>
      <Navigation back={INCLUDE_BACK_BTN_PATH.includes(path)} />
      <Outlet />
      {INCLUDE_FOOTER_PATH.includes(path) && <Footer />}
      {INCLUDE_TAB_BAR_PATH.includes(path) && <TabBar />}
    </>
  );
}
