import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '@store/auth';

const RefuseAuth = () => {
  const auth = useRecoilValue(authState);
  // 엑세스 있으면 홈으로
  if (auth.isAuthenticated) {
    return <Navigate replace to="/" />;
  }
  // 둘 다 없으면 로그인
  return <Outlet />;
};

export default RefuseAuth;
