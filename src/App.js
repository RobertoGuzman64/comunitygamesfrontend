import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Registro from './Containers/Registro/Registro';
import Perfil from './Containers/Perfil/Perfil';
import EditarPerfil from './Containers/EditarPerfil/EditarPerfil';
import EditarClave from './Containers/EditarClave/EditarClave';
import BorrarUsuario from './Containers/BorrarUsuario/BorrarUsuario';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/EditarPerfil" element={<EditarPerfil />} />
          <Route path="/EditarClave" element={<EditarClave />} />
          <Route path="/BorrarUsuario" element={<BorrarUsuario />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;