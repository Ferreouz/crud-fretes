import './App.css'
import Login from './pages/Login'
import { Route, Routes } from "react-router-dom";
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import Home from './pages/Home';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'http:',
});

function App() {
  return (
    <>
      <div className='container'>
        <AuthProvider store={store}>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth fallbackPath="/login">
                  <Home />
                </RequireAuth>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </AuthProvider>
      </div>
    </>
  )
}

export default App
