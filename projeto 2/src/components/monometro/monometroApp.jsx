import { useState } from 'react';
import styleP from "./potenciaStyle.module.css";
import { Link } from 'react-router-dom';
import { useRef } from 'react';

function MonometroApp() {

  const [imageLoad, setImageLoad] = useState(null); // Imagem a ser carregada
  const [result, setResult] = useState(null)
  const [isloading, setIsloading] = useState(false)
  const [errorMesage, setErrorMesage] = useState(null)
  const fileInputRef = useRef(null);

  // Função de cálculo
  const handleCalculate = async () => {
  

    // Criar FormData para enviar os dados e a imagem
    const formData = new FormData();
    
    if (imageLoad) {
      formData.append('image', imageLoad);
    }

    try {
      // Enviar requisição POST para o backend
      setIsloading(true)
      const response = await fetch('https://monometro.onrender.com/calculate', {
        method: 'POST', 
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json()
        setErrorMesage(errorData || "Erro ao processar requisição")
        return
        
      }

      const result = await response.json();
      setResult(result)
      console.log('Resultado do backend:', result);
      // Aqui você pode exibir os resultados na interface, se desejar
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setErrorMesage("Não foi possivel processar a imagem");
    } finally {
      setIsloading(false)
    }
  };

  const handleClear = () => {
  
    setImageLoad(null);
    setResult(null);
    setErrorMesage(null)
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';

    
  };

  const handleImageChange = (e) => {
    setImageLoad(e.target.files[0]);
    setErrorMesage(null)
    setResult(null)
  };

  return (
    <div className={styleP.AppPotencia}>
      <div className={styleP.container}>
        <header>
          <h1>Cálculo da Diferença de Pressão entre A e B</h1>
        </header>
        <section className={styleP.inputsP}>
          <h2>Parâmetros de Entrada</h2>
    
          <div>
            <label>
              Upload da foto (png) <span title="Insira a foto do monômetro">?</span>
              <input
                type="file"
                accept="image/png"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </section>
        <section className={styleP.buttonsP}>
          <button className={styleP.btnP1} onClick={handleCalculate} disabled= {isloading}>Calcular</button>
          {isloading ? 'Calculando...' : "" }
          <button className={styleP.btnP2} onClick={handleClear} ref={fileInputRef}>Limpar</button>
          <Link to={"/"}>
            <button className={styleP.btnP2}>Voltar</button>
          </Link>
        </section>
        <section className={styleP.result}>
          <h2>Resultado:</h2>
          {errorMesage && <p >{errorMesage.error}</p>}
          {result && (
        <>
            <p>Altura A = {result.Altura_PA?.toFixed(2)}</p>
            <p>Altura B = {result.Altura_PB?.toFixed(2)}</p>
            <p>Diferença de altura = {result.DifAltura?.toFixed(2)}</p>
            <p> Presão = {result.pressure?.toFixed(2)}</p>
            
        </>
           )}
        </section>
      </div>
    </div>
  );
}

export default MonometroApp;