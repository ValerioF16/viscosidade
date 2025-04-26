import { useState } from 'react';
import styleP from"./potenciaStyle.module.css";
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend ,ResponsiveContainer } from 'recharts';

function PresaoApp() {
  
  

  const [tempoInicial, setTempoInicial] = useState(""); //Estado do tempo inicial
  const [tempoFinal, setTempoFinal] = useState(''); //Estado do tempo final
  const [dados, setDados] = useState(null); //Estado dos dados
  const [presaoInicial, setPresaoInicial] = useState(""); // Estado pressao inicial
  
  

  const handleCalculate = () => {
    //TRATAMENTO DAS VARIAVEIS
    let tempoINNum = parseFloat(tempoInicial);
    let tempoIFNum = parseFloat(tempoFinal);
    let presaoNum = parseFloat(presaoInicial);

    if (tempoIFNum === 0) {
      alert("O tempo final nao pode ser zero")
    }
    const novoDados = [];
    for (let t = tempoINNum; t <= tempoIFNum; t++ ) {
      const pressao = presaoNum + 25 * t
      const temperatura = 50 + 6.25 * t
      novoDados.push({tempo: t, pressao, temperatura})
    }
    setDados(novoDados)

     

  };

  const handleClear = () => {
    setPresaoInicial('');
    setTempoInicial('');
    setTempoFinal('');
    setDados(null)
    
  };

  return (
    <div className={styleP.AppPotencia}>
      <div>
      </div>
      <div className={styleP.container} >
        <header>
          <h1>Grafico Pressao vs Tempo</h1>
        </header>
        <section className= {styleP.inputsP} >
          <h2>Parâmetros de Entrada</h2>
          <div>
            <label>
              Pressao Inicial (KPa) <span title="Insira a Pressao Inicial ">?</span>
            </label>
            <input
              type="number"
              value={presaoInicial}
              onChange={(e) => setPresaoInicial(e.target.value)}
              step="any"
            />
          </div>
          <div>
          </div>
          <div>
            <label>
              Tempo inicial (min) <span title="Insira o tempo inicial">?</span>
            </label>
            <input
              type="number"
              value={tempoInicial}
              onChange={(e) => setTempoInicial(e.target.value)}
              step="any"
            />
          </div>
          <div>
            <label>
              Tempo final (min) <span title="Insira o tempo final">?</span>
            </label>
            <input
              type="number"
              value={tempoFinal}
              onChange={(e) => setTempoFinal(e.target.value)}
              step="any"
            />
          </div>
        
          
        </section>
        <section className={styleP.buttonsP}>
          <button className= {styleP.btnP1} onClick={handleCalculate}>Calcular</button>
          <button className= {styleP.btnP2} onClick={handleClear}>Limpar</button>
          <Link to={"/"} >
                <button className= {styleP.btnP2} >
                  Voltar
                </button>
                </Link>
        </section>
        <section className={styleP.result}>
          <h2>Grafico:</h2>
          <div style={{ width: '100%', height: '400px' }}>
      <ResponsiveContainer>
        <LineChart
          data={dados}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="tempo"
            label={{ value: 'Tempo (minutos)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            label={{ value: 'Valor', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: 25 }} align='center' />
          <Line
            type="monotone"
            dataKey="pressao"
            stroke="#8884d8"
            name="Pressão (kPa)"
          />
          <Line
            type="monotone"
            dataKey="temperatura"
            stroke="#82ca9d"
            name="Temperatura (°C)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
          

        </section>
      </div>
    </div>
  );
}


export default PresaoApp;
