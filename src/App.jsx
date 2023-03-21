import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Row } from 'antd';


function App() {

  
  return (
    <div className="App">


      <Routes>
        <Route path='/login'  element={<Row>Login Page</Row>}/>
        <Route path='/register' element={<Row>Register Page</Row>}/>
        <Route path='/' element={<Row>Home Page</Row>}/>
        <Route path='/movie' element={<Row>Movie Page</Row>}/>
      </Routes>
    </div>
  )
}

export default App
