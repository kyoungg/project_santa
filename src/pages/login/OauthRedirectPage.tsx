import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { KakaoCode, postKakaoCode } from '/src/services/userApi';
import { useNavigate } from 'react-router-dom';
import { paths } from '/src/utils/path';

export default function OauthRedirectPage() {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get('code');

  const { mutate } = useMutation({
    mutationFn: (postData: KakaoCode) => postKakaoCode(postData),
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.data.accessToken);
      localStorage.setItem('refresh_token', data.data.refreshToken);
      alert('환영합니다!');
      navigate(paths.HOME);
    },
    onError: () => {
      navigate(paths.LOGIN);
    },
  });

  useEffect(() => {
    if (code) {
      const postData = {
        authorizationCode: code,
      };
      return mutate(postData);
    }
  }, [code]);

  return <></>;
}
