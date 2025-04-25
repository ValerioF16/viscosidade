import { useState } from 'react';
import './App.css';
import PagPrincipal from './components/homePage/homePage';
import PotenciaApp from './components/Potencia/potenciaApp';





function App() {

  return(
    <div>

      <PotenciaApp />
      <PagPrincipal />
    </div>
  )
  
}

export default App;
