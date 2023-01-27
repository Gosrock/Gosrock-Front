import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminMenuLayout } from '@components/shared/layout/AdminMenuLayout';
import Dashboard from './Dashboard';
import Info from './Info';
import Member from './Member';
import Events from './Events';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Alliance from './Alliance';

const menuItems = ['dashboard', 'info', 'member', 'slack'];

const HostsRouter = () => {
  const location = useLocation();
  const acticeMenuIndex = menuItems.indexOf(location.pathname.split('/')[3]);
  const [curActiveMenu, setCurActiveMenu] = useState<number>(acticeMenuIndex);
  return (
    <Routes>
      <Route
        element={
          <AdminMenuLayout
            page={'hosts'}
            curActiveMenu={curActiveMenu}
            setCurActiveMenu={setCurActiveMenu}
          />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/info" element={<Info />} />
        <Route path="/member" element={<Member />} />
        <Route path="/events" element={<Events />} />
        <Route path="/alliance" element={<Alliance />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
};

export default HostsRouter;
