import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
// import Login from './Containers/Login/Login';
import Registro from './Containers/Registro/Registro';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Login" element={<Login />} /> */}
          <Route path="/Registro" element={<Registro />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;