import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './styles/_global.scss';
import './styles/_reset.scss';
import Layout from './utils/Layout';
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/rank', element: <RankPage /> },
      { path: '/challenge', element: <ChallengePage /> },
      { path: '/gathering', element: <GatheringMainPage /> },
      { path: '/join', element: <JoinPage /> },
      { path: '/livechat', element: <>실시간 채팅 페이지 입니다</> },
      { path: '/gathering', element: <GatheringMainPage /> },
      { path: '/gathering/search', element: <GatheringSearchPage /> },
      { path: '/gathering/participate', element: <ParticipatingGroupPage /> },
      { path: '/gathering/post', element: <PostPage /> },
      { path: '/gathering/detail', element: <GatheringDetailPage /> },
      { path: '/trophy', element: <TrophyPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/user/find_account', element: <FindAccountPage /> },
      { path: '/user/find_password', element: <FindPasswordPage /> },
      { path: '/user/category', element: <CategoryPage /> },
    ],
  },
  {
    path: '/login',
    element: <>로그인 페이지 입니다</>,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
