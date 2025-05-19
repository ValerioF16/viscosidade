import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
//config react-router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//IMPORTANDO PAGINAS
import PagPrincipal from './components/homePage/homePage';
import PotenciaApp from './components/Potencia/potenciaApp';
import Teste from "./components/testeIndex/teste"
import ViscoCalc from "./components/viscosidades/calcViscosidade.jsx"
import TemperaturaApp from "./components/tanqueC3/temperatura.jsx"
import PresaoApp from "./components/tanqueC2/pressao.jsx"
import MonometroApp from "./components/monometro/monometroApp"
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Teste/>
  },
  {
    path: "/potencia",
    element: <PotenciaApp />
  },
  {
    path: "/viscosidade",
    element: <ViscoCalc />
  },
  {
    path: "/pressao",
    element: <PresaoApp />
  },
  {
    path:"/temperatura",
    element: <TemperaturaApp />
  },
  {
    path:"/monometro",
    element: <MonometroApp />
  } 

]);
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    
     <RouterProvider router={router}/>
    
  </StrictMode>,
)
