import {Route, Routes} from 'react-router-dom';
import Home from '../src/pages/Home.js';
import Store from '../src/pages/Store.js';
import Login from './pages/Login.js';



const App = () => {
  return(
    
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Home" element={<Home />} />
        <Route path="/Store" element={<Store />} />
    </Routes> 
  );
};


export default App;