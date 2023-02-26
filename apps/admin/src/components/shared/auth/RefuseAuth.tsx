import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '@lib/utils/cookie';
import { useCookies } from 'react-cookie';

const RefuseAuth = () => {
  const [cookies] = useCookies();
  const accessToken = cookies.accessToken;
  // 엑세스 있으면 홈으로
  if (accessToken) {
    return <Navigate replace to="/" />;
  }
  // 둘 다 없으면 로그인 */
  return <Outlet />;
};

export default RefuseAuth;
