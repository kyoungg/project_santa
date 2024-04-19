import { Outlet, useLocation } from 'react-router-dom';

import Navigation from '../components/common/Naigation/Navigation';
import TabBar from '../components/common/Naigation/TabBar';
import Footer from '../components/common/Footer';

const INCLUDE_TAB_BAR_PATH = ['/rank', '/challenge'];
const INCLUDE_BACK_BTN_PATH = ['/profile', '/livechat', '/join'];

export default function Layout() {
  const path = useLocation().pathname;
  return (
    <>
      <Navigation back={INCLUDE_BACK_BTN_PATH.includes(path)} />
      <Outlet />
      {INCLUDE_TAB_BAR_PATH.includes(path) && <TabBar />}
      <Footer />
    </>
  );
}
