import logo from '../../../assets/img/logo/logo.svg';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import './App.css';
import Dashboard from '../dashboard';
import Login from '../login';
import Register from '../register';
import {createStore} from 'redux'
import { Provider } from 'react-redux';
import {store} from '../../../config/redux'






function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
     {/* <ul>
          <li><Link to="/">Dashboard</Link></li>
        </ul>
        <ul>
          <li><Link to="/login">Login</Link></li>
        </ul>
        <ul>
          <li><Link to="/register">Register</Link></li>
        </ul> */}
      <Routes>
       
        <Route path='/' exact element={<Dashboard/>}></Route>
        <Route path='/login' exact element={<Login/>}></Route>
        <Route path='/register' exact element={<Register/>}></Route>
      </Routes>
    
    </BrowserRouter>
    </Provider>
  );
}

export default App;
