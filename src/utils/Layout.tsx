import { Outlet, useLocation } from 'react-router-dom';

import Navigation from '../components/common/Naigation/Navigation';
import TabBar from '../components/common/Naigation/TabBar';
import Footer from '../components/common/Footer';
import { paths } from './path';

const INCLUDE_TAB_BAR_PATH = [
  paths.HOME,
  paths.RANK,
  paths.GATHERING,
  paths.GATHERING_SEARCH,
  paths.MOUNTAIN,
  paths.PROFILE,
];

const INCLUDE_FOOTER_PATH = [paths.HOME, paths.RANK, paths.PROFILE];

//나중에 nav 컴포넌트 안에서 제어하기
const INCLUDE_BACK_BTN_PATH = [
  paths.JOIN,
  paths.TROPHY,
  paths.FIND_ACCOUNT,
  paths.FIND_PASSWORD,
  paths.RESET_PASSWORD,
  paths.CATEGORY,
  paths.MOUNTAIN_RECORD,
  paths.CHALLENGE,
  paths.PROFILE_EDIT,
  paths.MOUNTAIN_DETAIL,
  paths.CHALLENGE_DETAIL,
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
