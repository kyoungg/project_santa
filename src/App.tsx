import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './styles/_global.scss';
import './styles/_reset.scss';
import { paths } from './utils/path';
import Layout from './utils/Layout';
import { PrivateRoutes, PublicRoutes } from './utils/routes';
import JoinPage from './pages/join/JoinPage';
import GatheringMainPage from './pages/gathering/GatheringMainPage';
import MainPage from './pages/main/MainPage';
import RankPage from './pages/rank/RankPage';
import { GatheringSearchPage } from './pages/gathering/GatheringSearchPage';
import { ParticipatingGroupPage } from './pages/gathering/ParticipatingGroupPage';
import { PostPage } from './pages/gathering/PostPage';
import { GatheringDetailPage } from './pages/gathering/GatheringDetailPage';
import ProfilePage from './pages/profile/ProfilePage';
import ChallengePage from './pages/challenge/ChallengePage';
import TrophyPage from './pages/trophy/TrophyPage';
import FindAccountPage from './pages/user/find/FindAccountPage';
import FindPasswordPage from './pages/user/find/FindPasswordPage';
import CategoryPage from './pages/user/category/CategoryPage';
import ErrorPage from './pages/error/ErrorPage';
import LoginPage from './pages/login/LoginPage';
import ResetPasswordPage from './pages/user/find/ResetPasswordPage';
import VertifyMountainPage from './pages/user/mountain/VertifyMountainPage';
import RecordMountainPage from './pages/user/mountain/RecordMountainPage';
import ProfileEditPage from './pages/profile/edit/ProfileEditPage';
import { GatheringDetailEditPage } from './pages/gathering/GatheringDetailEditPage';
import { GatheringSearchResultPage } from './pages/gathering/GatheringSearchResultPage';
import { AdminMainPage } from './pages/admin/AdminMainPage';
import { AdminUserPage } from './pages/admin/AdminUserPage';

const router = createBrowserRouter([
  {
    path: paths.HOME,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: paths.RANK, element: <RankPage /> },
      { path: paths.GATHERING, element: <GatheringMainPage /> },
      { path: paths.LIVECHAT, element: <>실시간 채팅 페이지 입니다</> },
      { path: paths.GATHERING_SEARCH, element: <GatheringSearchPage /> },
      { path: paths.GATHERING_PARTICIPATE, element: <ParticipatingGroupPage /> },
      { path: paths.GATHERING_DETAIL, element: <GatheringDetailPage /> },
      { path: paths.GATHERING_DETAIL_EDIT, element: <GatheringDetailEditPage /> },
      { path: paths.GATHERING_SEARCHRESULT, element: <GatheringSearchResultPage /> },
      { path: paths.GATHERING_POST, element: <PostPage /> },
      { path: paths.PROFILE_EDIT, element: <ProfileEditPage /> },
      { path: paths.TROPHY, element: <TrophyPage /> },
      { path: paths.ADMIN, element: <AdminMainPage /> },
      { path: paths.ADMIN_USER, element: <AdminUserPage /> },
      { path: paths.ADMIN_REPORT, element: <AdminMainPage /> },
      { path: paths.ADMIN_CATEGORY, element: <AdminMainPage /> },
      { path: paths.ADMIN_CHALLENGE, element: <AdminMainPage /> },
      {
        element: <PrivateRoutes />,
        children: [
          { path: paths.PROFILE, element: <ProfilePage /> },
          { path: paths.CHALLENGE, element: <ChallengePage /> },
          { path: paths.CATEGORY, element: <CategoryPage /> },
          { path: paths.MOUNTAIN_VERTIFY, element: <VertifyMountainPage /> },
          { path: paths.MOUNTAIN_RECORD, element: <RecordMountainPage /> },
          { path: paths.TROPHY, element: <TrophyPage /> },
        ],
      },
      {
        element: <PublicRoutes />,
        children: [
          { path: paths.JOIN, element: <JoinPage /> },
          { path: paths.FIND_ACCOUNT, element: <FindAccountPage /> },
          { path: paths.FIND_PASSWORD, element: <FindPasswordPage /> },
          { path: paths.RESET_PASSWORD, element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
  {
    path: paths.HOME,
    element: <PublicRoutes />,
    children: [{ path: paths.LOGIN, element: <LoginPage /> }],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
