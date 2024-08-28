import './App.css'
import Login from './pages/Login'
import { Route, Routes } from "react-router-dom";
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import HomeAdmin from './pages/Admin/Home';
import Home from './pages/Driver/Home';
import VehiclesAdmin from './pages/Admin/Vehicles'
import VehicleTypeAdmin from './pages/Admin/VehicleTypes'
import UsersAdmin from './pages/Admin/Users'
import { useEffect, useState } from 'react';
import { IUser } from './types';
import { getLoginStatus } from './hooks/getLoginStatus';
import { useNavigate } from 'react-router-dom';
import Page404 from './404';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'http:',
});

function App() {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const navigate = useNavigate();

  async function checkLogin() {
    const temp = await getLoginStatus();
    setUser(temp);
    if (!temp) {
      navigate("/login");
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await checkLogin();
    };
    fetchData();
  }, []);

  return (
    <>
      <AuthProvider store={store}>
        <Routes>
          <Route path="/login" element={<Login onLogin={checkLogin} />}></Route>
          {
            user?.type == "admin" ?
              <>
                <Route
                  path="/"
                  element={
                    <RequireAuth fallbackPath="/login">
                      <HomeAdmin />
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="/veiculos"
                  element={
                    <RequireAuth fallbackPath="/login">
                      {<VehiclesAdmin />}
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="/veiculos-tipos"
                  element={
                    <RequireAuth fallbackPath="/login">
                      <VehicleTypeAdmin />
                    </RequireAuth>
                  }
                ></Route>
                <Route
                  path="/usuarios"
                  element={
                    <RequireAuth fallbackPath="/login">
                      <UsersAdmin />
                    </RequireAuth>
                  }
                ></Route>
              </>
              : <>
                <Route
                  path="/"
                  element={
                    <RequireAuth fallbackPath="/login">
                      <Home />
                    </RequireAuth>
                  }
                ></Route>
              </>
          }
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </AuthProvider>
    </>
  )
}


export default App
