import { useState } from 'react';
import styleP from "./potenciaStyle.module.css";
import { Link } from 'react-router-dom';
import { useRef } from 'react';

function MonometroApp() {
  const [pa, setPA] = useState(""); // Pressão no Ponto A
  const [pb, setPB] = useState(''); // Pressão no Ponto B
  const [t, setT] = useState(''); // Tamanho do braço
  const [imageLoad, setImageLoad] = useState(null); // Imagem a ser carregada
  const [result, setResult] = useState(null)
  const [isloading, setIsloading] = useState(false)
  const [errorMesage, setErrorMesage] = useState(null)
  const fileInputRef = useRef(null);

  // Função de cálculo
  const handleCalculate = async () => {
    // Tratamento das variáveis
    
    const paNum = parseFloat(pa);
    const pbNum = parseFloat(pb);
    const tNum = parseFloat(t);
    

    if (isNaN(paNum) || isNaN(pbNum) || isNaN(tNum)) {
      alert('Por favor, insira valores numéricos para todos os parâmetros.');
      return;
    }

    if (tNum === 0) {
      alert("O braço do monômetro não pode ser zero");
      return;
    }

    // Criar FormData para enviar os dados e a imagem
    const formData = new FormData();
    formData.append('pa', paNum);
    formData.append('pb', pbNum);
    formData.append('t', tNum);
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
    setPA('');
    setPB('');
    setT('');
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
              Pressão no Ponto A (Pa) <span title="Insira a pressão no ponto A">?</span>
            </label>
            <input
              type="number"
              value={pa}
              onChange={(e) => setPA(e.target.value)}
              step="any"
            />
          </div>
          <div>
            <label>
              Pressão no Ponto B (Pa) <span title="Insira a pressão no ponto B">?</span>
            </label>
            <input
              type="number"
              value={pb}
              onChange={(e) => setPB(e.target.value)}
              step="any"
            />
          </div>
          <div>
            <label>
              Tamanho do braço (m) <span title="Insira o tamanho do braço">?</span>
            </label>
            <input
              type="number"
              value={t}
              onChange={(e) => setT(e.target.value)}
              step="any"
            />
          </div>
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
            <p>Diferença = {result.pressure?.toFixed(2)}</p>
        </>
           )}
        </section>
      </div>
    </div>
  );
}

export default MonometroApp;