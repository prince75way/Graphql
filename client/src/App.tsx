import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import useInactivity from './hooks/userInactivity';
import { logout as userLogout } from './redux/slices/userSlice';


// Regular imports
import Basic from './layout/Basic';
import Home from './pages/homepage';
import UserAuth from './pages/userauth';

import ChatPage from './pages/chatpage';


const App: React.FC = () => {
  const dispatch = useDispatch();

  const { isAuthenticated: isUserAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  useInactivity(30 * 60 * 1000, () => {
    if (isUserAuthenticated) {
      dispatch(userLogout());
      alert('User session expired due to inactivity.');
    }
  });

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Basic />}>
            <Route element={<Home />} path="/" />
   
            <Route element={<UserAuth />} path="/user/auth" />
            <Route element={<ChatPage />} path="/chat" />
         
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
