import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Registro from './Containers/Registro/Registro';
import Perfil from './Containers/Perfil/Perfil';
import EditarPerfil from './Containers/EditarPerfil/EditarPerfil';
import EditarClave from './Containers/EditarClave/EditarClave';
import BorrarUsuario from './Containers/BorrarUsuario/BorrarUsuario';
import Comunidades from './Containers/Comunidades/Comunidades';
import Comunidad from './Containers/Comunidad/Comunidad';
import CrearComunidad from './Containers/CrearComunidad/CrearComunidad';
import Buscar from './Containers/Buscar/Buscar';
import Miembro from './Containers/Miembro/Miembro';
import Chat from './Containers/Chat/Chat';
import EditarComunidad from './Containers/EditarComunidad/EditarComunidad';
import BorrarComunidad from './Containers/BorrarComunidad/BorrarComunidad';



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
          <Route path="/Comunidades" element={<Comunidades />} />
          <Route path="/Comunidad" element={<Comunidad />} />
          <Route path="/CrearComunidad" element={<CrearComunidad />} />
          <Route path="/Buscar" element={<Buscar />} />
          <Route path="/Miembro" element={<Miembro />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/EditarComunidad" element={<EditarComunidad />} />
          <Route path="/BorrarComunidad" element={<BorrarComunidad />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;