import { useState } from 'react';
import OpenAI from 'openai';
import styleV from "./viscosidadeStyle.module.css";
import { Link } from 'react-router-dom';


async function searchOilsByViscosity(viscosity, temperature = "40°C", marca = "") {
  const apiUrl = import.meta.env.VITE_API_URL
  const response = await fetch(`${apiUrl}/api/viscosidade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ viscosity, temperature, marca  }),
  });

  if (!response.ok) {
    throw new Error("Erro na resposta da API");
  }

  const data = await response.json();
  return data;
}


function ViscoCalc() {
  const  [marca, setMarca] = useState("")
  const [t, setT] = useState("");
  const [n, setN] = useState("");
  const [v, setV] = useState(null);
  const [opcao, setOpcao] = useState("")
  const [valor, setValor] = useState ("")
  const [resultadoValor, setResultadoValor] = useState("")
  const [oilData, setOilData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    
    const tNum = parseFloat(t);
    const nNum = parseFloat(n);
    const nValor = parseFloat(valor)

    if (isNaN(tNum) || isNaN(nNum)) {
      alert('Por favor, insira valores numéricos para todos os parâmetros.');
      return;
    }

    if (!Number.isInteger(nNum) || nNum < 1 || nNum > 5) {
      alert("Digite um número de orifício válido (1 a 5)");
      return;
    }
    
    let viscosity;
    if (nNum === 1 && tNum >= 55 && tNum <= 100) {
      viscosity = 0.49 * (tNum - 35);
    } else if (nNum === 2 && tNum >= 40 && tNum <= 100) {
      viscosity = 1.44 * (tNum - 18);
    } else if (nNum === 3 && tNum >= 20 && tNum <= 100) {
      viscosity = 2.31 * (tNum - 6.58);
    } else if (nNum === 4 && tNum >= 20 && tNum <= 100) {
      viscosity = 3.85 * (tNum - 4.49);
    } else if (nNum === 5 && tNum >= 20 && tNum <= 100) {
      viscosity = 0.49 * (tNum - 35);
    } else {
      alert("Tempo de escoamento fora do intervalo para o orifício selecionado.");
      return;
    }

    setV(viscosity);
    if (opcao === "sim") {
      if(!isNaN(nValor)) {
        const calcPoise = viscosity * nValor
        setResultadoValor(calcPoise)

      } else {
        alert("Digite um valor exato para a viscosidade")
        return
      }

    }
    setLoading(true);
    setError(null);

    try {
      const data = await searchOilsByViscosity(viscosity.toFixed(2), marca);
      setOilData(data);
    } catch (err) {
      setError("Erro ao buscar dados da API.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMarca('');
    setT('');
    setN('');
    setOpcao('')
    setValor('')
    setResultadoValor('')
    setV(null);
    setOilData(null);
    setError(null);
  };

  return (
    <div className={styleV.AppPotencia}>
      <div className={styleV.container}>
        <header>
          <h1>Cálculo de Viscosidade</h1>
        </header>
        <section className={styleV.inputsP}>
          <h2>Parâmetros de Entrada</h2>
          <div>
            <label >
              Você deseja calcular densidade dinâmica ? (poise) 
              <select  id="acao" value = {opcao} onChange={(e) => setOpcao(e.target.value)}

              
              > <option value="">--Selecione--</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
              { opcao === "sim" && (
                <div>
                  <label >
                    Densidade do oleo (kg/m³) <span title="Insira a densidade do oleo">?</span>
                    <input type="number" 
                    value={valor}
                    onChange={(e)=> setValor(e.target.value)}
                    step="any"
                    />
                  </label>
                </div> )
              } 
            </label>
          </div>
          <div>
            <label>
              Oleo lubrificante (marca) <span title="Selecione o nome do oleo lubrificante">?</span>
            </label>
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              step="1"
            />
          </div>
          <div>
            <label>
              Número do orifício (1-5) <span title="Selecione o número do orifício">?</span>
            </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(e.target.value)}
              step="1"
            />
          </div>
          <div>
            <label>
              Tempo de escoamento (segundos) <span title="Insira o tempo de escoamento em segundos">?</span>
            </label>
            <input
              type="number"
              value={t}
              onChange={(e) => setT(e.target.value)}
              step="any"
            />
          </div>
        </section>
        <section className={styleV.buttonsP}>
          <button className={styleV.btnP1} onClick={handleCalculate}>Calcular</button>
          <button className={styleV.btnP2} onClick={handleClear}>Limpar</button>

          <Link to={"/"}>
            <button className={styleV.btnP2}>Voltar</button>
          </Link>
        </section>
        <section className={styleV.result}>
          <h2>Resultado:</h2>
          <p>
            Viscosidade = {v ? `${v.toFixed(2)} cSt` : ''}
          </p>
          { resultadoValor !== null && (
            <p>
              Viscosidade dinâmica = {resultadoValor ? `${resultadoValor.toFixed(2)} (poise) ` : ''} 
            </p> )
          }

          {loading && <p>Carregando dados da API...</p>}
          {error && <p>{error}</p>}
          {oilData && (
            <div>
              <h3>Dados dos Óleos:</h3>
              <pre>{oilData}</pre>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ViscoCalc;