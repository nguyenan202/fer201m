import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Row, notification } from 'antd';
import Header from './components/Header';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import Register from './pages/Register';
import { useEffect } from 'react';
import { setNotification } from './redux/store';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Managment from './pages/Management';


function App() {

  const [api, context] = notification.useNotification();

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const openNotification = (type, message) => {
    api[type]({
      message: message,
    });
  };

  useEffect(() => {
    dispatch(setNotification({ value: openNotification }))
  }, [])


  return (
    <div className="App">


      <Header />

      <Routes>
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
        <Route path='/' element={<Home/>} />
        <Route path='/movie/:id' element={<Movie/>} />
        <Route path='/manage' element={user ? (user.role === 1 ? <Managment/> : <Row>Access Denied</Row>) : <Login/>} />
      </Routes>
      {context}
    </div>
  )
}

export default App
