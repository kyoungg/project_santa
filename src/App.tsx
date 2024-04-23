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
import ProfilePage from './pages/profile/ProfilePage';
import ChallengePage from './pages/challenge/ChallengePage';
import TrophyPage from './pages/trophy/TrophyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <> hi dveloper🙃 im error page </>,
    children: [
      { index: true, element: <MainPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/rank', element: <RankPage /> },
      { path: '/challenge', element: <ChallengePage /> },
      { path: '/gathering', element: <GatheringMainPage /> },
      { path: '/join', element: <JoinPage /> },
      { path: '/livechat', element: <>실시간 채팅 페이지 입니다</> },
      { path: '/gathering', element: <GatheringMainPage /> },
      { path: '/gathering', element: <GatheringSearchPage /> },
      { path: '/trophy', element: <TrophyPage /> },
      { path: '/find_password', element: <>비번찾기</> },
      { path: '/find_account', element: <>계정찾기</> },
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
