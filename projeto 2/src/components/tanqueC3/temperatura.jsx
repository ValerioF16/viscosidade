import { useState } from 'react';
import styleP from "./potenciaStyle.module.css";
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TemperaturaApp() {

  const [tempeInicial, setTempeInicial] = useState(""); 
  const [tempeFinal, setTempeFinal] = useState(''); 
  const [dados, setDados] = useState(null); 
  const [presaoInicial, setPresaoInicial] = useState(""); 
  

  const handleCalculate = () => {
    let tempeINNum = parseFloat(tempeInicial);
    let tempeIFNum = parseFloat(tempeFinal);
    let presaoNum = parseFloat(presaoInicial);

    if (tempeIFNum === 0) {
      alert("A temperatura final não pode ser zero");
      return;
    }
    if (isNaN(tempeINNum) || isNaN(tempeIFNum) || isNaN(presaoNum)) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const novoDados = [];
    for (let t = tempeINNum; t <= tempeIFNum; t += 10) {
      const T1 = tempeINNum + 273.15;
      const T = t + 273.15;
      const pressao = presaoNum * (T / T1);
      
      novoDados.push({ temperatura: t, pressao: parseFloat(pressao.toFixed(2)) });
    }
    setDados(novoDados);
  };

  const handleClear = () => {
    setPresaoInicial('');
    setTempeInicial('');
    setTempeFinal('');
    setDados(null);
  };

  return (
    <div className={styleP.AppPotencia}>
      <div className={styleP.container}>
        <header>
          <h1>Gráfico Pressão vs Temperatura</h1>
        </header>
        <section className={styleP.inputsP}>
          <h2>Parâmetros de Entrada</h2>
          <div>
            <label>
              Pressão Inicial (MPa) <span title="Insira a pressão inicial">?</span>
            </label>
            <input
              type="number"
              value={presaoInicial}
              onChange={(e) => setPresaoInicial(e.target.value)}
              step="any"
            />
          </div>
          <div>
            <label>
              Temperatura Inicial (°C) <span title="Insira a temperatura inicial">?</span>
            </label>
            <input
              type="number"
              value={tempeInicial}
              onChange={(e) => setTempeInicial(e.target.value)}
              step="any"
            />
          </div>
          <div>
            <label>
              Temperatura Final (°C) <span title="Insira a temperatura final">?</span>
            </label>
            <input
              type="number"
              value={tempeFinal}
              onChange={(e) => setTempeFinal(e.target.value)}
              step="any"
            />
          </div>
        </section>

        <section className={styleP.buttonsP}>
          <button className={styleP.btnP1} onClick={handleCalculate}>Calcular</button>
          <button className={styleP.btnP2} onClick={handleClear}>Limpar</button>
          <Link to={"/"}>
            <button className={styleP.btnP2}>
              Voltar
            </button>
          </Link>
        </section>

        <section className={styleP.result}>
          <h2>Gráfico:</h2>
          <div style={{ width: '100%', height: '400px' }}>
            {dados && (
              <ResponsiveContainer>
                <LineChart
                  data={dados}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="temperatura"
                    label={{ value: 'Temperatura (°C)', position: 'insideBottom', offset: -5, dy : 10 }}
                  />
                  <YAxis
                    label={{ value: 'Pressão (MPa)', angle: -90, position: 'insideLeft' , dy :50}}
                  />
                  <Tooltip />
                  <Legend  verticalAlign="bottom" wrapperStyle={{ paddingTop: 25 }} align='center' />
                  <Line
                    type="monotone"
                    dataKey="pressao"
                    stroke="#8884d8"
                    name="Pressão (MPa)"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default TemperaturaApp;
