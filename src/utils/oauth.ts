const REST_API_KEY = 'aabb7108871c3e28e5bdf175209583fd';
const REDIRECT_URL = 'http://localhost:5173/oauth/kakao';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}`;
