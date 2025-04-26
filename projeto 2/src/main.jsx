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
  }

]);
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    
     <RouterProvider router={router}/>
    
  </StrictMode>,
)
