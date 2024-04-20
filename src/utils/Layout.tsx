import { Outlet, useLocation } from 'react-router-dom';

import Navigation from '../components/common/Naigation/Navigation';
import TabBar from '../components/common/Naigation/TabBar';
import Footer from '../components/common/Footer';

const INCLUDE_TAB_BAR_PATH = ['/', '/rank'];
const INCLUDE_FOOTER_PATH = ['/', '/rank'];

const INCLUDE_BACK_BTN_PATH = ['/profile', '/livechat', '/join'];

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
